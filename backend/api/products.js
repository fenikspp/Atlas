module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const product = {
            segmento: req.body.segmento,
            produtos: req.body.produto,
            pontos: req.body.pontos
        }

        if(req.params.id) product.idproduct = req.params.id

        try {
            existsOrError(product.segmento, 'Segmento do produto não informado!')
            existsOrError(product.produtos, 'Nome do produto não informado!')
            existsOrError(product.pontos, 'É necessario que o produto possua uma pontuação')

            const productFromDB = await app.db('atlas.products')
                .where({ produtos: product.produtos }).first()

            if(!product.idproduct) {
                notExistsOrError(productFromDB, 'Produto já cadastrado!')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(product.idproduct) {
            app.db('atlas.products')
                .update(product)
                .where({ idproducts: product.idproduct })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('atlas.products')
                .insert(product)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('atlas.products')
            .select('idproducts','segmento', 'produtos', 'pontos')
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('atlas.products')
            .select('idproducts','segmento', 'produtos', 'pontos')
            .where({ idproducts: req.params.id })
            .first()
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const getBySeg = (req, res) => {
        app.db('atlas.products')
            .select('idproducts','segmento', 'produtos', 'pontos')
            .where({ segmento: req.params.seg })
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {

    }

    return { save, get, getById, getBySeg, remove }

};
