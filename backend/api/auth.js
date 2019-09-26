const { authSecret } = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.userName || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const employeer = await app.db('atlas.employees')
            .where({ userName: req.body.userName })
            .first()

        if (!employeer) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, employeer.password)
        if(!isMatch) return res.status(401).send('Usuário ou senha inválidos!')

        const now = Math.floor( Date.now() / 1000 )

        const payload = {
            id: employeer.idemployees,
            name: employeer.name,
            userName: employeer.userName,
            email: employeer.email,
            type: employeer.type,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode( payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const employeerData = req.body || null
        try {
            if(employeerData) {
                const token = jwt.decode(employeerData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema com o token
        }

        res.send(false)
    }

    const loginWithFacebook = (req, res) => {
        res.send('this checks the status of the request. Good Luck!')
    }

    return { signin, validateToken, loginWithFacebook }

}
