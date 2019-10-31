module.exports = app => {
    
    const limit = 3

    const salesPerMonth = async (req, res) => {
        const Month = req.query.month || 1
        const Year = req.query.year || 2019
        const page = req.query.page || 1

        const countSalesPerDate = await app.db('atlas.sale_for_now')
            .count('sale_for_now.id')
            .whereBetween('sale_for_now.created_at', 
                [`${Year}-${Month}-01 00:00:02`, `${Year}-${parseInt(Month) + 1}-01 00:00:01`])
            .first()

        const countEmployees = await app.db('atlas.employees')
            .count('employees.idemployees').first()
            
        const countSalesPerMonth = parseInt(countSalesPerDate.count)
        const countEmployeesAll = parseInt(countEmployees.count)

        app.db('atlas.sale_for_now')
            .select('*')
            .whereBetween('sale_for_now.created_at', 
                [`${Year}-${Month}-01 00:00:02`, `${Year}-${parseInt(Month) + 1}-01 00:00:01`])
            .limit(limit).offset(page * limit - limit)
            .then(sale => res.json({ data: sale, limit, countSalesPerMonth, countEmployeesAll }))
            .catch(err => res.status(500).send(err))
    }

    return { salesPerMonth }

}
