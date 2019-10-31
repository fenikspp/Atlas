<template>
    <div class="md-layout">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-header data-background-color="blue">
                <h4 class="title">Alteração de Senha</h4>
                <p class="category">Altere sua senha para ter acesso as estatísticas de venda. </p>
            </md-card-header>
            <md-card-content>
                <form novalidate class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50" hidden>
                        <md-field>
                            <label>Nome</label>
                            <md-input v-model="mountedEmployeer.name"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50" hidden>
                        <md-field>
                            <label>User Name</label>
                            <md-input v-model="mountedEmployeer.userName"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50" hidden>
                        <md-field>
                            <label>Tipo</label>
                            <md-input v-model="mountedEmployeer.type"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field :md-toggle-password="false">
                            <md-icon>lock_outline</md-icon>
                            <label>Senha</label>
                            <md-input v-model="mountedEmployeer.password" type="password" placeholder="Senha..."></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Confirmar Senha</label>
                            <md-input v-model="mountedEmployeer.confirmPassword"></md-input>
                        </md-field>
                    </div>
                </form>
            </md-card-content>
            <md-card-actions>
                <md-button class="md-success" @click="save()">Salvar</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError, employeerKey } from '../../../config/js/Global'

export default {
    name: 'Reset',
    data() {
        return {
            employeer: null,
            mountedEmployeer: {}
        }
    },
    methods: {
        mountedEmployees() {
            this.employeer = this.$store.state.employeer
            if (this.employeer != null) {
                this.mountedEmployeer = this.employeer
            }
        },
        save() {
            const url = `${baseApiUrl}/employees/${this. mountedEmployeer.id}`
            const updatedEmployerr = {
                name : this.mountedEmployeer.name,
                userName: this.mountedEmployeer.userName,
                type: this.mountedEmployeer.type,
                password: this.mountedEmployeer.password,
                confirmPassword: this.mountedEmployeer.confirmPassword
            }
            axios.put(url, updatedEmployerr)
                .then(() => {
                    localStorage.removeItem(employeerKey)
                    this.$store.commit('setEmployeer', null)
                    this.$router.push({ name: 'auth' })
                })
                .catch(showError)
        }
    },
    mounted() {
        this.mountedEmployees()
    }
}
</script>

<style>

</style>
