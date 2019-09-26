module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.employees.save)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/auth/facebook/callback')
        .get(app.api.auth.loginWithFacebook)

    app.route('/auth/facebook')
        .get(app.config.passport.authenticate())

    // Employees
    app.route('/employees')
        .get(app.api.employees.get)
        .post(app.api.employees.save)
    
    app.route('/employees/:id')
        .put(app.api.employees.save)
        .get(app.api.employees.getById)
    
    app.route('/employees_all')
        .get(app.api.employees.getAll)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/stats')
        .get(app.api.stat.get)

    // Individuals 
    app.route('/individuals')
        .post(app.api.individuals.save)
        .get(app.api.individuals.get)
    
    app.route('/individual/:cpf')
        .get(app.api.individuals.send_id)
    
    // Products
    app.route('/products')
        .get(app.api.products.get)
        .post(app.api.products.save)
    
    app.route('/product/:id')
        .get(app.api.products.getById)
        .put(app.api.products.save)
        .delete(app.api.products.remove)
    
    app.route('/products/:seg')
        .get(app.api.products.getBySeg)

    // Teams

    app.route('/teams')
        .post(app.api.teams.save)
        .get(app.api.teams.get)

    app.route('/teams/:id')
        .put(app.api.teams.save)
        .get(app.api.teams.getById)
    
    // Sales for now

    app.route('/sales')
        .post(app.api.sales_for_now.save)
        .get(app.api.sales_for_now.get)
    
    app.route('/sales/employeer/:id')
        .get(app.api.sales_for_now.getByEmployeer)

    app.route('/saleprocessing/:id')
        .get(app.api.sales_for_now.getById)
    // Sales Teste 
    app.route('/newsale')
        .post(app.api.sales.save)
        .get(app.api.sales.get)
    
}
