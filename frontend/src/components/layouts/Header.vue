<template>
    <md-toolbar md-elevation="0" class="md-transparent">
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
                <h3 class="md-title">{{ $route.name }}</h3>
            </div>
            <div class="md-toolbar-section-end">
                <md-button
                class="md-just-icon md-simple md-toolbar-toggle"
                :class="{ toggled: $sidebar.showSidebar }"
                @click="toggleSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </md-button>

                <div class="md-collapse">
                    <div class="md-autocomplete">
                        <md-autocomplete
                            class="search"
                        >
                            <label>Search...</label>
                        </md-autocomplete>
                    </div>
                    <md-list>
                        <md-list-item href="#/">
                            <i class="material-icons">dashboard</i>
                            <p class="hidden-lg hidden-md">Dashboard</p>
                        </md-list-item>
                        <li class="md-list-item">
                            <a href="#/notifications"
                                class="md-list-item-router md-list-item-container md-button-clean dropdown">
                                <div class="md-list-item-content">
                                    <drop-down>
                                        <md-button slot="title"
                                            class="md-button md-just-icon md-simple"
                                            data-toggle="dropdown">
                                            <md-icon>notifications</md-icon>
                                            <span class="notification">5</span>
                                            <p class="hidden-lg hidden-md">Notifications</p>
                                        </md-button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="#">Mike John responded to your email</a></li>
                                            <li><a href="#">You have 5 new tasks</a></li>
                                            <li><a href="#">You're now friend with Andrew</a></li>
                                            <li><a href="#">Another Notification</a></li>
                                            <li><a href="#">Another One</a></li>
                                        </ul>
                                    </drop-down>
                                </div>
                            </a>
                        </li>
                        <li class="md-list-item">
                            <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                                <div class="md-list-item-content">
                                    <drop-down>
                                        <md-button slot="title"
                                            class="md-button md-just-icon md-simple"
                                            data-toggle="dropdown">
                                            <md-icon>person</md-icon>
                                            <p class="hidden-lg hidden-md">UserDropdown</p>
                                        </md-button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><router-link to="/admin" v-if="employeer.type == 'admin'"><md-icon>settings_applications</md-icon> Administração</router-link></li>
                                            <li><a href @click.prevent="logout"><md-icon>exit_to_app</md-icon> Sair</a></li>
                                        </ul>
                                    </drop-down>
                                </div>
                            </a>
                        </li>
                    </md-list>
                </div>
            </div>
        </div>
    </md-toolbar>
</template>

<script>
import { employeerKey } from '../../config/js/Global'
import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: mapState(['employeer']),
    data() {
        return {
        }
    },
    methods: {
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        logout() {
            localStorage.removeItem(employeerKey)
            this.$store.commit('setEmployeer', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style lang="scss" scoped>
    .md-menu {
        margin: 24px;
    }
</style>
