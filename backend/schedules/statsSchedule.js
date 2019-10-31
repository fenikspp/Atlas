const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const employeesCount = await app.db.withSchema('atlas').count('idemployees').first().from('employees')
        const salesCount = await app.db.withSchema('atlas').count('id').first().from('sale_for_now')

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'updatedAt' : -1 } })

        const stat = new Stat({
            employees: employeesCount.count,
            sales: salesCount.count,
            updatedAt: new Date(),
            createdAt: new Date()
        })

        const changeEmployees = !lastStat || stat.employees !== lastStat.employees
        const changeSales = !lastStat || stat.sales !== lastStat.sales

        if(changeEmployees || changeSales) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}