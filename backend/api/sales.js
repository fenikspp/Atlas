module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        
        const sale = {
            id_employees: req.body.idEmployees,
            status: req.body.status
        }
        
        if(req.body.client_type == false) {
            const individual = {
                name: req.body.name,
                cpf: req.body.cpf,
                birthday: req.body.birthday,
                gender: req.body.gender,
                email: req.body.email,
                mother_name: req.body.mother_name,
                rg: req.body.rg
            }

            try {
                existsOrError(individual.name, 'Nome não informado!')
                existsOrError(individual.cpf, 'CPF não informado!')
                existsOrError(individual.birthday, 'Data de Nascimento não informada!')
                existsOrError(individual.mother_name, 'Nome da mãe não informado!')

            } catch(msg) {
                return res.status(400).send(msg)
            }

            if(req.params.id) sale.idsales = req.params.id

            if(sale.idsales) {
                try {
                    const idindividual = await app.db('atlas.individuals')
                        .select('*').where({ cpf: individual.cpf }).first()

                    sale.id_individuals = idindividual.idindividuals
                    const individualID = idindividual.idindividuals

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
                        numero_conjunto: req.body.numero_conjunto,
                        chacara: req.body.chacara,
                        numero_chacara: req.body.numero_chacara,
                        casa: req.body.casa,
                        complemento: req.body.complemento,
                        logradouro: req.body.logradouro,
                        id_individuals: individualID.toString()
                    }

                    try {
                        existsOrError(phone.ddd, 'DDD não informado!') 
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
                        .where({ idindividuals: individualID })
                        .whereNull('deleted_at')
                    
                    await app.db('atlas.address')
                        .update(address)
                        .where({ id_individuals: individualID })
                    
                    await app.db('atlas.phones')
                        .update(phone)
                        .where({ id_individuals: individualID })
                    
                    await app.db('atlas.sales')
                        .update(sale)
                        .where({ id_sales: sale.idsales })
                    
                    if(req.body.voz) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.voz
                        }

                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.voz } )
                    }

                    if(req.body.dados) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.dados
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.dados } )
                    }

                    if(req.body.tv) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.tv
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.tv } )
                    }
                    if(req.body.controle) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.controle
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.controle } )
                    }

                    res.status(204).send()

                } catch (msg) {
                    res.status(500).send(err)
                }
            } else {
                try {
                    const phone = {
                        ddd: req.body.ddd,
                        number_res: req.body.number_res,
                        number_com: req.body.number_com,
                        number_cel: req.body.number_cel
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
                        logradouro: req.body.logradouro
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
                    
                    try {
                        await app.db('atlas.individuals')
                            .insert(individual)
        
                        const idindividual = await app.db('atlas.individuals')
                            .select('*').where({ cpf: individual.cpf }).first()

                        sale.id_individuals = idindividual.idindividuals
                        const individualID = idindividual.idindividuals

                        phone.id_individuals = individualID.toString()
                        address.id_individuals = individualID.toString()

                        await app.db('atlas.individuals')
                            .update({ created_at: new Date() })
                            .where({ idindividuals: individualID })

                        await app.db('atlas.address')
                            .insert(address)

                        await app.db('atlas.phones')
                            .insert(phone)

                        await app.db('atlas.sales')
                            .insert(sale)

                        const saleID = await app.db('atlas.sales')
                            .select('*').where({ id_employees: sale.id_employees, status:sale.status, id_individuals:individualID }).first()
                    
                        const IDsale = saleID.idsales

                        console.log(IDsale);
                        
                        if(req.body.voz) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.voz
                            }

                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }

                        if(req.body.dados) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.dados
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                                
                        }

                        if(req.body.tv) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.tv
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }
                        if(req.body.controle) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.controle
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }
                        
                        res.status(204).send('Venda efetuada com sucesso!')
                        
                    } catch(msg) {
                        res.status(400).send(msg)
                    }
                    
                } catch (msg) {
                    res.status(500).send(err)
                }
            }

        } else if(req.body.client_type == true) {
            const entities = {
                name: req.body.name,
                cnpj: req.body.cnpj,
                email: req.body.email
            }
            
            try {
                existsOrError(entities.name, 'Nome não informado!')
                existsOrError(entities.cnpj, 'CNPJ não informado!')
                
                const entitiesFromDB = await app.db('atlas.entities')
                    .where({ cnpj: entities.cnpj }).first()
                if(!entities.identities) {
                    notExistsOrError(entitiesFromDB, 'Cliente já cadastrado!')
                }

            } catch(msg) {
                return res.status(400).send(msg)
            }
            
            if(req.params.id) sale.idsales = req.params.id

            if(sale.idsales) {
                try {
                    const id_entities = await app.db('atlas.entities')
                        .select('*').where({ cnpj: entities.cnpj }).first()

                    sale.id_entities = id_entities.identities
                    const entitiesID = id_entities.identities

                    const phone = {
                        ddd: req.body.ddd,
                        number_res: req.body.number_res,
                        number_com: req.body.number_com,
                        number_cel: req.body.number_cel,
                        id_entities: entitiesID.toString()
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
                        logradouro: req.body.logradouro,
                        id_entities: entitiesID.toString()
                    }

                    try {
                        existsOrError(phone.ddd, 'DDD não informado!') 
                        existsOrError(address.uf, 'Estado não informado!')
                        existsOrError(address.municipio, 'Municipio não informado!')
                        existsOrError(address.cidade, 'Cidade não informado!')
                        existsOrError(address.casa, 'Número da casa não informado!')
                        existsOrError(address.logradouro, 'Informe o logradouro completo!')
                        existsOrError(phone.id_entities && address.id_entities, 'ERRO!')
                    } catch(msg) {
                        return res.status(400).send(msg)
                    }

                    await app.db('atlas.entities')
                        .update(entities)
                        .update({ updated_at: new Date() })
                        .where({ identities: entitiesID })
                        .whereNull('deleted_at')
                    
                    await app.db('atlas.address')
                        .update(address)
                        .where({ id_entities: entitiesID })
                    
                    await app.db('atlas.phones')
                        .update(phone)
                        .where({ id_entities: entitiesID })
                    
                    await app.db('atlas.sales')
                        .update(sale)
                        .where({ id_sales: sale.idsales })
                    
                    if(req.body.voz) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.voz
                        }

                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.voz } )
                    }

                    if(req.body.dados) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.dados
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.dados } )
                    }

                    if(req.body.tv) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.tv
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.tv } )
                    }
                    if(req.body.controle) {

                        let list = {
                            id_sales: sale.idsales,
                            id_products: req.body.controle
                        }
                        
                        await app.db('atlas.sales_has_products')
                            .update(list)
                            .where( { id_sales:sale.idsales, id_products:req.body.controle } )
                    }

                    res.status(204).send()

                } catch (msg) {
                    res.status(500).send(err)
                }    
            } else {
                
                try {
                    const phone = {
                        ddd: req.body.ddd,
                        number_res: req.body.number_res,
                        number_com: req.body.number_com,
                        number_cel: req.body.number_cel
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
                        logradouro: req.body.logradouro
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
                    
                    try {
                        await app.db('atlas.entities')
                            .insert(entities)
                            
                        
                        const id_entities = await app.db('atlas.entities')
                            .select('*').where({ cnpj: entities.cnpj }).first()

                        sale.id_entities = id_entities.identities
                        const entitiesID = id_entities.identities

                        phone.id_entities = entitiesID.toString()
                        address.id_entities = entitiesID.toString()
                        

                        await app.db('atlas.entities')
                            .update({ created_at: new Date() })
                            .where({ identities: entitiesID })

                              
                    
                        await app.db('atlas.address')
                            .insert(address)  

                        await app.db('atlas.phones')
                            .insert(phone)

                        await app.db('atlas.sales')
                            .insert(sale)

                        const saleID = await app.db('atlas.sales')
                            .select('*').where({ id_employees: sale.id_employees, status: sale.status, id_entities:entitiesID }).first()
                        
                        const IDsale = saleID.idsales
                        
                        if(req.body.voz) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.voz
                            }

                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }

                        if(req.body.dados) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.dados
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                                
                        }

                        if(req.body.tv) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.tv
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }
                        if(req.body.controle) {

                            let list = {
                                id_sales: IDsale,
                                id_products: req.body.controle
                            }
                            
                            await app.db('atlas.sales_has_products')
                                .insert(list)
                        }
                        
                        res.status(204).send('Venda efetuada com sucesso!')
                        
                    } catch(msg) {
                        res.status(400).send(msg)
                    }
                    
                } catch (msg) {
                    res.status(500).send(err)
                }
            }
        }
        
    }

    const salecart = (res, sale) => {
        sale.products = app.db('atlas.sales').select('*')
        return sale
    }

    const get = async (req, res) => {
        
        const sale = await app.db('atlas.sales')
            .select('sales.idsales as codigo','individuals.name as individual', 'entities.name as entitie',
            'employees.name as seller')
            .leftJoin('atlas.individuals', 'sales.id_individuals', 'individuals.idindividuals')
            .leftJoin ('atlas.entities', 'sales.id_entities', 'entities.identities')
            .join('atlas.employees', 'sales.id_employees', 'employees.idemployees')
        
            //console.log(typeof(sale));
            //console.log(salecart(sale, res));
            //res.json(salecart(sale, res))
    }

    return { save, get }
}
