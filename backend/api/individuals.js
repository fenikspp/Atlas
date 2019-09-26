module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        
        const individual = {
            name: req.body.name,
            cpf: req.body.cpf,
            birthday: req.body.birthday,
            gender: req.body.gender,
            email: req.body.email,
            mother_name: req.body.mother_name,
            rg: req.body.rg
        }
        
        if(req.params.id) individual.idindividuals = req.params.id

        try {
            existsOrError(individual.name, 'Nome não informado!')
            existsOrError(individual.cpf, 'CPF não informado!')
            existsOrError(individual.birthday, 'Data de Nascimento não informada!')
            existsOrError(individual.mother_name, 'Nome da mãe não informado!')

            const individualFromDB = await app.db('atlas.individuals')
                .where({ cpf: individual.cpf }).first()
            if(!individual.idindividuals) {
                notExistsOrError(individualFromDB, 'Cliente já cadastrado!')
            }
        
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(individual.idindividuals) {
            try {
                const idIndividual = await app.db('atlas.individuals')
                    .select('idindividuals').where({ cpf: individual.cpf }).first()
                    
                const individualID = idIndividual.idindividuals

                const phone = {
                        ddd: req.body.ddd,
                        number_res: req.body.number_res,
                        number_com: req.body.number_com,
                        number_cel: req.body.number_cel,
                        id_individuals: individualID.toString()
                }

                const address = {
                        uf: req.body.uf,
                        municipio: req.body.municipio,
                        cidade: req.body.cidade,
                        bairro: req.body.bairro,
                        quadra: req.body.quadra,
                        numero_quadra: req.body.numero_quadra,
                        conjunto: req.body.conjunto,
                        numero_conjuto: req.body.numero_conjuto,
                        chacara: req.body.chacara,
                        numero_chacara: req.body.numero_chacara,
                        casa: req.body.casa,
                        complemento: req.body.complemento,
                        logradouro: req.body.logradouro,
                        id_individuals: individualID.toString()
                }

                try {
                    existsOrError(phone.ddd, 'DDD não informado!')
                    existsOrError(phone.number_cel && phone.number_com && phone.number_cel, 'Nenhum número para contato foi informado!') 
                    existsOrError(address.uf, 'Estado não informado!')
                    existsOrError(address.municipio, 'Municipio não informado!')
                    existsOrError(address.cidade, 'Cidade não informado!')
                    existsOrError(address.casa, 'Número da casa não informado!')
                    existsOrError(address.logradouro, 'Informe o logradouro completo!')
                    existsOrError(phone.id_individuals && address.id_individuals, 'ERRO!')

                } catch(msg) {
                    return res.status(400).send(msg)
                }

                await app.db('atlas.individuals')
                    .update(individual)
                    .update({ updated_at: new Date() })
                    .where({ idindividuals: id_individual })
                    .whereNull('deleted_at')
                
                await app.db('atlas.address')
                    .update(address)
                    .update({ updated_at: new Date() })
                    .where({ id_individuals: id_individual })
                
                await app.db('atlas.phones')
                    .update(phone)
                    .update({ updated_at: new Date() })
                    .where({ id_individuals: id_individual })
                
                res.status(204).send()

            } catch (msg) {
                res.status(500).send(err)
            }                
        } else {
            try{

                const phone = {
                    ddd: req.body.ddd,
                    number_res: req.body.number_res,
                    number_com: req.body.number_com,
                    number_cel: req.body.number_cel,
                }

                const address = {
                    uf: req.body.uf,
                    municipio: req.body.municipio,
                    cidade: req.body.cidade,
                    bairro: req.body.bairro,
                    quadra: req.body.quadra,
                    numero_quadra: req.body.numero_quadra,
                    conjunto: req.body.conjunto,
                    numero_conjunto: req.body.numero_conjunto,
                    chacara: req.body.chacara,
                    numero_chacara: req.body.numero_chacara,
                    casa: req.body.casa,
                    complemento: req.body.complemento,
                    cep: req.body.cep,
                    logradouro: req.body.logradouro,
                }

                try {
                    existsOrError(phone.ddd, 'DDD não informado!') 
                    existsOrError(address.uf, 'Estado não informado!')
                    existsOrError(address.municipio, 'Municipio não informado!')
                    existsOrError(address.cidade, 'Cidade não informado!')
                    existsOrError(address.casa, 'Número da casa não informado!')
                    existsOrError(address.logradouro, 'Informe o logradouro completo!')
                } catch(msg) {
                    return res.status(400).send(msg)
                }

                await app.db('atlas.individuals')
                    .insert(individual)

                const idIndividual = await app.db('atlas.individuals')
                    .select('*').where({ cpf: individual.cpf }).first()

                const individualID = idIndividual.idindividuals

                phone.id_individuals = individualID.toString()
                address.id_individuals = individualID.toString()

                await app.db('atlas.individuals')
                    .update({ created_at: new Date() })
                    .where({ idindividuals: individualID })

                await app.db('atlas.address')
                    .insert(address)
                
                await app.db('atlas.phones')
                    .insert(phone)
                
                res.status(204).send()
            } catch(msg) {
                res.status(500).send(msg)
            }
        } 

    }

    const send_id = async (req, res) => {
        await app.db('atlas.individuals')
            .select('idindividual')
            .where({ cpf: req.params.cpf })
            .then(id_individual => res.json(id_individual))
            .catch(err => res.status(500).send(err))
    }

    const get = async (req, res) => {
        await app.db('atlas.individuals')
            .innerJoin('atlas.phones', 'phones.id_individuals', 'individuals.idindividuals')
            .innerJoin('atlas.address', 'address.id_individuals', 'individuals.idindividuals')
            .then(individuals => res.json(individuals))
            .catch(err => res.status(500).send(err))
    }

    return { get, save, send_id }

}
