<template>
    <ul class="nav nav-mobile-menu">
        <li>
            <md-field>
                <label>Search</label>
                <md-input v-model="search" type="text"></md-input>
            </md-field>
        </li>
        <li>
            <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="material-icons">perm_identity</i>
                    <span class="notification"></span>
                    <p>User preferences</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                    <li><router-link to="/admin" v-if="employeer.type == 'admin'"><md-icon>settings_applications</md-icon> Administração</router-link></li>
                    <li><a href @click.prevent="logout"><md-icon>exit_to_app</md-icon> Sair</a></li>
                </ul>
            </drop-down>
        </li>
         <!--<li>
           <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="material-icons">notifications</i>
                    <span class="notification">5</span>
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
        </li> -->
    </ul>
</template>
<script>
import { employeerKey } from '../../config/js/Global'
import { mapState } from 'vuex'

export default {
    computed: mapState(['employeer']),
    data() {
        return {
      
        }
    },
    methods: {
        logout() {
            localStorage.removeItem(employeerKey)
            this.$store.commit('setEmployeer', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>
