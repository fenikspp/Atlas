module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        employees: Number,
        sales: Number,
        updatedAt: Date,
        createdAt: String
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'updatedAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    employees: 0,
                    sales: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}