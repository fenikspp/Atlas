const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const employeer = { ...req.body }
        if(req.params.id) employeer.idemployees = req.params.id
    
        try {
            existsOrError(employeer.name, 'Nome não informado!')
            existsOrError(employeer.userName, 'Nome de Usuário não informado!')
            existsOrError(employeer.type, 'Informe o tipo de usuário!')
            existsOrError(employeer.password, 'Senha não informada!')
            existsOrError(employeer.confirmPassword, 'Confirmação de senha inválida!')
            equalsOrError(employeer.password, employeer.confirmPassword,
                'Senhas não conferem')

            const employeerFromDB = await app.db('atlas.employees')
                .where({ userName: employeer.userName }).first()
            if(!employeer.idemployees) {
                notExistsOrError(employeerFromDB, 'Usuário já cadastrado')
            }

        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        employeer.password = encryptPassword(employeer.password)
        delete employeer.confirmPassword

        if(employeer.idemployees) {
            app.db('atlas.employees')
                .update(employeer)
                .update({updated_at: new Date()})
                .where({ idemployees: employeer.idemployees })
                .whereNull('deleted_at')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('atlas.employees')
                .insert(employeer)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        
    }

    const get = async (req, res) => {
        app.db('atlas.employees')
            .select('employees.idemployees', 'employees.name', 'employees.userName', 'employees.type', 'teams.name as team')
            .leftJoin('atlas.teams', 'teams.idTeam', 'employees.team')
            .then(employees => res.json(employees))
            .catch(err => res.status(500).send(err))
    }

    const getAll = async(req, res) => {
        app.db('atlas.employees')
            .select('name', 'idemployees')
            .then(employees => res.json(employees))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('atlas.employees')
            .select('idemployees', 'name', 'userName', 'type')
            .where({ idemployees: req.params.id })
            .whereNull('deleted_at')
            .first()
            .then(employeer => res.json(employeer))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ employeerId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('atlas.employees')
                .update({deleted_at: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getAll, getById, remove }

}
