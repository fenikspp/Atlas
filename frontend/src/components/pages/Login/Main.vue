<template>
    <div>
        <md-toolbar class="md-transparent md-toolbar-absolute 
            md-theme-default md-elevation-0">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <h3 class="md-title">{{ $route.name }}</h3>
                </div>
               <!-- <div class="md-toolbar-section-end">
                    <router-link to="/signup">
                        <md-button class="md-button-clean md-simple md-round">
                        <md-icon>person_add</md-icon>
                            Registrar
                        </md-button>
                    </router-link>
                </div> -->
            </div>
        </md-toolbar>
        <div class="container md-layout">
            <div class="md-layout-item md-size-30 md-medium-size-30 md-small-size-70 md-xsmall-size-100">
                <md-card>
                    <md-card-header data-background-color="blue">
                        <h4 class="title">Login</h4>
                    </md-card-header>
                    <md-card-content>
                        <!--<md-field v-if="showSignup">
                            <md-icon>person</md-icon>
                            <label>Usuário</label>
                            <md-input v-model="employeer.name" type="email" value="Digite seu nome" placeholder="Usuário..."></md-input>
                        </md-field> -->
                        <md-field>
                            <md-icon>person</md-icon>
                            <label>Nome de usuário</label>
                            <md-input v-model="employeer.userName" placeholder="UserName..."></md-input>
                        </md-field>
                        <md-field :md-toggle-password="false">
                            <md-icon>lock_outline</md-icon>
                            <label>Senha</label>
                            <md-input v-model="employeer.password" type="password" placeholder="Senha..."></md-input>
                        </md-field>
                    </md-card-content>
                    <md-card-actions class="md-alignment-right">
                        <md-button class="md-info md-lg md-simple"
                            @click="signin">
                            Entrar
                        </md-button>
                    </md-card-actions>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, employeerKey } from '../../../config/js/Global'
import axios from 'axios'

export default {
    name: 'Auth',
    data() {
        return {
            employeer: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.employeer)
                .then(res => {
                    this.$store.commit('setEmployeer', res.data)
                    localStorage.setItem(employeerKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        }
    }
}
</script>

<style lang="scss" scoped>
    footer {
        justify-content: center;
        text-align: center;
    }
    .rodape {
        padding: 20px;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }
    md-card {
        box-sizing: inherit
    }
    .md-button{
        font-weight: 500;
        color: #FFF;
    }
    .md-button.md-simple{
        font-weight: 500;
        color: #FFF;
    }
    .md-card-actions{
        border: 0;
        text-align:center;
        justify-content: center;
    }
    .md-layout {
        text-align:center;
        justify-content: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
    }
    .md-card .title {
        margin-top: 0;
        margin-bottom: 3px;
    }
    .md-card-header{
        border-radius: 6px;
    }
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }

</style>
