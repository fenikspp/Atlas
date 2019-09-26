const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {

        const person = {
            NAME: req.body.name,
            EMAIL: req.body.email,
            PASSWORD: req.body.password,
            CONFIRM_PASSWORD: req.body.confirmPassword
        }

        if(req.params.id) person.IDPERSON = req.params.id

        try {
            existsOrError(person.NAME, 'Nome não informado!')
            existsOrError(person.EMAIL, 'E-mail não informado!')
            existsOrError(person.PASSWORD, 'Senha não informada!')
            existsOrError(person.CONFIRM_PASSWORD, 'Confirmação de senha inválida!')
            equalsOrError(person.PASSWORD, person.CONFIRM_PASSWORD,
                'Senhas não conferem!')

            const personFromDB = await app.db('PERSONS')
                .where({ email: person.EMAIL }).first()
            if(!person.IDPERSON) {
                notExistsOrError(personFromDB, 'Usuário já cadastrado!')
            }

        } catch(msg) {
            return res.status(400).send(msg)
        }

        person.PASSWORD = encryptPassword(person.PASSWORD)
        delete person.CONFIRM_PASSWORD

        if(person.IDPERSON) {
            app.db('PERSONS')
                .update(person)
                .where({ IDPERSON: person.IDPERSON })
                .whereNull('DELETED_AT')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            try {
                await app.db('PERSONS')
                    .insert(person)

                const idPerson = await app.db('PERSONS')
                    .select('IDPERSON').where({ EMAIL: person.EMAIL })
                    .first()
                
                const id_Person = idPerson.IDPERSON
    
                const address = {
                    IDADDRESS: req.body.idAddress,
                    UF: req.body.uf,
                    CITY: req.body.city,
                    DISTRICT: req.body.district,
                    STREET: req.body.street,
                    HOUSE: req.body.house,
                    ID_PERSON: id_Person.toString()
                    }

                const phone = {
                    IDPHONE: req.body.idphone,
                    TYPE: req.body.phoneType,
                    DDD: req.body.ddd,
                    NUMBER: req.body.number,
                    ID_PERSON: id_Person.toString()
                }
                await app.db('PERSONS')
                    .update({ CREATED_AT: new Date() })
                    .where({ IDPERSON: id_Person })
        
                await app.db('ADDRESS')
                    .insert(address)

                await app.db('PHONES')
                    .insert(phone)
                
                res.status(204).send()

            } catch(msg) {
                res.status(500).send(msg)
            }
        }

    }

    const get = (req, res) => {
        
    }

    return { save }

}
