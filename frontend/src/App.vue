<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <!--<notifications></notifications> -->
        <side-bar v-if="employeer">
            <Menu slot="content"></Menu>
            <sidebar-link to="/" >
                <md-icon>dashboard</md-icon>
                <p>Dashboard</p>
            </sidebar-link>
            <ul class="nav nav-mobile-menu">
                 <li>
                    <drop-down>
                        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="material-icons">notifications</i>
                            <span class="notification">6</span>
                            <p>Notifications</p>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#">Mike John responded to your email</a></li>
                            <li><a href="#">You have 5 new tasks</a></li>
                            <li><a href="#">You're now friend with Andrew</a></li>
                            <li><a href="#">Another Notification</a></li>
                            <li><a href="#">Another One</a></li>
                        </ul>
                    </drop-down>
                </li>
            </ul>
            <sidebar-link to="/sale" v-if="employeer.type == 'vend'|| employeer.type == 'admin'">
                <md-icon>assignment</md-icon>
                <p>Formulário</p>
            </sidebar-link>
            <sidebar-link to="/sales" v-if="employeer.type == 'vend' || employeer.type == 'admin'">
                <md-icon>turned_in</md-icon>
                <p>Vendas</p>
            </sidebar-link>
            <sidebar-link to="/processing" v-if="employeer.type == 'bko' || employeer.type == 'admin'">
                <md-icon>list_alt</md-icon>
                <p>Tratamento</p>
            </sidebar-link>
        </side-bar>

        <div v-if="employeer" class="main-panel">
            <Loading v-if="validatingToken"/>
            <div v-else>
                <Header ></Header>
                <Content ></Content>
                <Footer ></Footer>
            </div>
        <!--<content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
        </div>
        <div v-else class="rodape">
            <Content />
            <Footer />
        </div>

    </div>
</template>
<style lang="scss"></style>
<script>
import Header from './components/layouts/Header.vue'
import Menu from './components/layouts/Menu.vue'
import Content from './components/layouts/Content.vue'
import Footer from './components/layouts/Footer.vue'
import Loading from './components/layouts/Loading.vue'

import { baseApiUrl, employeerKey } from './config/js/Global'
import { mapState } from 'vuex'
import axios from 'axios'


export default {
    name: 'App',    
    components: { Header, Menu, Content, Footer, Loading },
    computed: mapState(['employeer']),
    data() {
        return {
            validatingToken: true
        }
    },
    methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(employeerKey)
			const employeerData = JSON.parse(json)
			this.$store.commit('setEmployeer', null)

			if(!employeerData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, employeerData)

			if (res.data) {
                this.$store.commit('setEmployeer', employeerData)
			} else {
				localStorage.removeItem(employeerKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
    },
    created() {
		this.validateToken()
	}
}

</script>
<style>
::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 12px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 12px;
    -webkit-box-shadow: inset 0 0 6px rgba(238, 230, 230, 0.5); 
}

.rodape > Footer {
        justify-content: center;
        text-align: center;
        padding: 20px;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }
</style>

