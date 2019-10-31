import Vue from 'vue'
import App from './App.vue'
import MaterialDashboard from './config/js/material-dashboard'
import DropdownPlugin from './config/js/DropDown'
import GlobalDirectives from './config/js/globalDirectives'

import store from './config/js/Store'
import router from './config/routes/router'

import './config/js/bootstrap'
import './config/js/msgs'
import './config/js/axios'
import './config/js/Mask'

Vue.config.productionTip = false

Vue.use(MaterialDashboard)
Vue.use(DropdownPlugin)
Vue.use(GlobalDirectives)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
