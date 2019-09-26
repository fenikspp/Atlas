module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const sale = { ...req.body }

        if(req.params.id) sale.id = req.params.id

        if (sale.cnpj) {
            try {
                existsOrError(sale.name, 'Nome não informado!')
                existsOrError(sale.cnpj, 'CNPJ não informado!')
                existsOrError(sale.email, 'E-mail não informado!')
                existsOrError(sale.ddd, 'Informe um número de telefone!')
                existsOrError(sale.uf, 'Informe um estado!')
                existsOrError(sale.cidade, 'Informe uma cidade')
                if (!sale.number_res && !sale.number_com && !sale.number_cel) {
                    existsOrError(sale.number, 'Nenhum numero de telefone foi informado!')
                }
                if (!sale.voz && !sale.dados && !sale.tv && !sale.controle) {
                    existsOrError(sale.dados, 'Nenhum produto foi informado!')
                }
                
                const saleFromDB = await app.db('atlas.sale_for_now')
                    .where({ cnpj: sale.cnpj }).first()
                if(!sale.id) {
                    notExistsOrError(saleFromDB, 'Cliente já cadastrado!')
                }
            } catch (msg) {
                return res.status(400).send(msg)
            }
        } else {
            try {
                existsOrError(sale.name, 'Nome não informado!')
                existsOrError(sale.cpf, 'CPF/CNPJ não informado!')
                existsOrError(sale.email, 'E-mail não informado!')
                existsOrError(sale.gender, 'Sexo não informado!')
                existsOrError(sale.birthday, 'Data de nascimento não informada!')
                existsOrError(sale.ddd, 'Informe um número de telefone!')
                existsOrError(sale.uf, 'Informe um estado!')
                existsOrError(sale.cidade, 'Informe uma cidade')
                if (!sale.number_res && !sale.number_com && !sale.number_cel) {
                    existsOrError(sale.number, 'Nenhum numero de telefone foi informado!')
                }
                if (!sale.voz && !sale.dados && !sale.tv && !sale.controle) {
                    existsOrError(sale.dados, 'Nenhum produto foi informado!')
                }
                
                const saleFromDB = await app.db('atlas.sale_for_now')
                    .where({ cpf: sale.cpf }).first()
                if(!sale.id) {
                    notExistsOrError(saleFromDB, 'Cliente já cadastrado!')
                }

            } catch(msg) {
                return res.status(400).send(msg)
            }
        }

        if(sale.id) {
            app.db('atlas.sale_for_now')
                .update(sale)
                .where({ id : sale.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('atlas.sale_for_now')
                .insert(sale)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('atlas.sale_for_now')
            .select('sale_for_now.id as codigo', 'sale_for_now.status','sale_for_now.name as cliente',
                'sale_for_now.cpf', 'sale_for_now.cnpj','sale_for_now.gender','sale_for_now.email',
                'sale_for_now.mother_name','sale_for_now.ddd','sale_for_now.birthday','employees.name as vendedor',
                'sale_for_now.number_res','sale_for_now.number_cel','sale_for_now.number_com', 'sale_for_now.uf',
                'sale_for_now.municipio', 'sale_for_now.cidade','sale_for_now.bairro','teams.name as team',
                'sale_for_now.quadra','sale_for_now.numero_quadra', 'sale_for_now.chacara', 'sale_for_now.numero_chacara',
                'sale_for_now.conjunto', 'sale_for_now.numero_conjunto', 'sale_for_now.casa', 'sale_for_now.complemento',
                'sale_for_now.cep', 'sale_for_now.logradouro', 'v.produtos as voz', 'v.pontos as voz_pontos', 'd.produtos as dados',
                'd.pontos as dados_pontos', 'sale_for_now.tecnologia', 't.produtos as tv', 't.pontos as tv_pontos', 'sale_for_now.pontos_adicionais',
                'sale_for_now.tv_lacart', 'c.produtos as controle', 'c.pontos as controle_pontos', 'sale_for_now.data_vencimento', 'sale_for_now.fatura',
                'sale_for_now.content')
            .leftJoin('atlas.products as v', 'sale_for_now.voz', 'v.produtos')
            .leftJoin('atlas.products as d', 'sale_for_now.dados', 'd.produtos')
            .leftJoin('atlas.products as t', 'sale_for_now.tv', 't.produtos')
            .leftJoin('atlas.products as c', 'sale_for_now.controle', 'c.produtos')
            .leftJoin('atlas.employees', 'sale_for_now.id_vendedor', 'employees.idemployees')
            .leftJoin('atlas.teams', 'teams.idTeam', 'employees.team')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('atlas.sale_for_now')
            .select('sale_for_now.id as codigo', 'sale_for_now.status','sale_for_now.name as cliente',
                'sale_for_now.cpf', 'sale_for_now.cnpj','sale_for_now.gender','sale_for_now.email',
                'sale_for_now.mother_name','sale_for_now.ddd','sale_for_now.birthday','employees.name as vendedor',
                'sale_for_now.number_res','sale_for_now.number_cel','sale_for_now.number_com', 'sale_for_now.uf',
                'sale_for_now.municipio', 'sale_for_now.cidade','sale_for_now.bairro','teams.name as team',
                'sale_for_now.quadra','sale_for_now.numero_quadra', 'sale_for_now.chacara', 'sale_for_now.numero_chacara',
                'sale_for_now.conjunto', 'sale_for_now.numero_conjunto', 'sale_for_now.casa', 'sale_for_now.complemento',
                'sale_for_now.cep', 'sale_for_now.logradouro', 'v.produtos as voz', 'v.pontos as voz_pontos', 'd.produtos as dados',
                'd.pontos as dados_pontos', 'sale_for_now.tecnologia', 't.produtos as tv', 't.pontos as tv_pontos', 'sale_for_now.pontos_adicionais',
                'sale_for_now.tv_lacart', 'c.produtos as controle', 'c.pontos as controle_pontos', 'sale_for_now.data_vencimento', 'sale_for_now.fatura',
                'sale_for_now.content')
            .leftJoin('atlas.products as v', 'sale_for_now.voz', 'v.produtos')
            .leftJoin('atlas.products as d', 'sale_for_now.dados', 'd.produtos')
            .leftJoin('atlas.products as t', 'sale_for_now.tv', 't.produtos')
            .leftJoin('atlas.products as c', 'sale_for_now.controle', 'c.produtos')
            .leftJoin('atlas.employees', 'sale_for_now.id_vendedor', 'employees.idemployees')
            .leftJoin('atlas.teams', 'teams.idTeam', 'employees.team')
            .where({ id: req.params.id })
            .first()
            .then(sale => {
                sale.content = sale.content.toString()
                return res.json(sale)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByEmployeer = (req, res) => {
        app.db('atlas.sale_for_now')
            .where({ id_vendedor : req.params.id })
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getByEmployeer, getById }
}
