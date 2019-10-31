import Vue from 'vue'
import VueRouter from 'vue-router'

//import Layout from '../../components/layouts/Main.vue'

//Admin
import Home from '../../components/pages/Home/Main.vue'
import Admin from '../../components/pages/Admin/Main.vue'

//Vendedor
import Formulario from '../../components/pages/Vend/Formulario/Main.vue'
import Sales from '../../components/pages/Vend/Sales/Main.vue'

// Bko
import Processing from '../../components/pages/Bko/Sales-processing/Main.vue'

// Users
import UserProfile from '../../components/pages/UserPage/Profile/Main.vue'

import Auth from '../../components/pages/Login/Main.vue'
import Register from '../../components/pages/Register/Main.vue'

import { employeerKey } from '../../config/js/Global'

Vue.use(VueRouter)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Administração',
        path: '/admin',
        component: Admin,
        meta: { requiresType: true}
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    },
    {
        name: 'signup',
        path: '/signup',
        component: Register
    },
    {
        name: 'Cadastro de Venda',
        path: '/sale',
        component: Formulario
    },
    {
        name: 'Vendas',
        path: '/sales',
        component: Sales
    },
    {
        name: 'Tratamento de Vendas',
        path: '/processing',
        component: Processing

    },
    {
        name: 'Perfil',
        path: '/userprofile',
        component: UserProfile
    }
]

const router = new VueRouter({
    routes,
    linkExactActiveClass: "nav-item active"
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(employeerKey)

    if(to.matched.some(record => record.meta.requiresType)) {
        const employeer = JSON.parse(json)
        employeer && employeer.type == 'admin' ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router