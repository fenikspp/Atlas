const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const { port, address } = require('./.env')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedules/')
    .then('./config/routes.js')
    .into(app)

app.listen(port, address, () => {
    console.log(`Backend executando na porta:\u001b[34m http://${address}:${port}\u001b[0m`)
    console.log(`Para parar a aplicação, pressione CTRL + C, e depois confirme com "S"`)
})