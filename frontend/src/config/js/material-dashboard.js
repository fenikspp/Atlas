import SideBar from '../../components/plugins/SideBar'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '../../assets/scss/material-dashboard.scss'
import 'es6-promise/auto'

export default {
    install(Vue) {
        Vue.use(SideBar)
        Vue.use(VueMaterial)
    }
}