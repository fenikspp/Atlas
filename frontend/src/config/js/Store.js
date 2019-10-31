import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        employeer: null
    },
    mutations: {
        setEmployeer(state, employeer) {
            state.employeer = employeer
            if(employeer) {
                axios.defaults.headers.common['Authorization'] = `bearer ${employeer.token}`
                //state.isMenuVisible = false
            } else {
                delete axios.defaults.headers.common['Authorization']
                //state.isMenuVisible = true
            }
        }
    }
})