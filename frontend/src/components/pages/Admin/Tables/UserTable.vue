<template>
    <div>
        <div>
            <md-dialog :md-active.sync="showDialog">
                <md-card class="md-layout-item md-size-100 md-small-size-100">
                    <md-card-header data-background-color="blue">
                        <h4 class="title">Cadastro de Usuário</h4>
                        <p class="category">Informe os dados do Usuário</p>
                    </md-card-header>
                    <md-card-content>
                        <form novalidate class="md-layout" @submit.prevent="validateUser">
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Nome</label>
                                    <md-input v-model="employee.name"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Nome de Usuário</label>
                                    <md-input v-model="employee.userName"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <label class="title">Tipo</label>
                                <div class="input">
                                    <md-radio v-model="employee.type" value="vend" class="md-primary">Vendedor</md-radio>
                                    <md-radio v-model="employee.type" value="bko" class="md-primary">Bko</md-radio>
                                    <md-radio v-model="employee.type" value="admin" class="md-primary">Admin</md-radio>
                                </div>  
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Equipe</label>
                                    <md-select v-model="employee.team">
                                        <md-option :key="item" v-for="item in teams" :value="item.codigo">{{item.nome}}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field :md-toggle-password="false">
                                    <label>Senha</label>
                                    <md-input type="password" v-model="employee.password"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Confirmação de senha</label>
                                    <md-input type="password" v-model="employee.confirmPassword"></md-input>
                                </md-field>
                            </div>
                        </form>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-secondary" @click="close()">Fechar</md-button>
                        <md-button class="md-success" @click="save()">Salvar</md-button>
                    </md-card-actions>
                </md-card>
            </md-dialog>
            <md-button class="md-just-icon md-simple md-info" @click="showDialog = true">
                <md-icon>person_add</md-icon>
                <md-tooltip md-direction="top">Adicionar Usuário</md-tooltip>
            </md-button>
        </div>
        <b-table hover striped :items="employees" :fields="fields">
             <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadEmployee(data.item)" class="mr-2">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Editar</md-tooltip>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <md-icon>close</md-icon>
                    <md-tooltip md-direction="top">Excluir</md-tooltip>
                </b-button>
            </template>
        </b-table>
        <div class="md-layout-item md-small-size-100 md-size-100 mt-4">
            <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../../../config/js/Global'
import axios from 'axios'

export default {
    name: 'EmployeesTable',
    data() {
        return {
            employee: {},
            teams: [],
            employees: [],
            showDialog: false,
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'idemployees', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'team', label: 'Equipe', sortable: true},
                { key: 'type', label: 'Tipo', sortable: true,
                    formatter: (value) => {
                        if (value == 'vend' ) {
                           return 'Vendedor'
                        }
                        if (value == 'bko') {
                            return 'BackOffice'
                        }
                        if (value == 'admin') {
                            return 'Administrador'
                        }
                    }},
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        save() {
            const method = this.employee.idemployees ? 'put' : 'post' 
            const id = this.employee.idemployees ? `/${this.employee.idemployees}` : ''
            axios[method](`${baseApiUrl}/employees${id}`, this.employee)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.showDialog = false
                    this.employee = {}
                    location.reload()
                })
                .catch(showError)
        },
        loadEmployees() {
            const url = `${baseApiUrl}/employees/?page=${this.page}`
            axios.get(url).then(res => {
                this.employees = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadEmployee(employee) {
            this.showDialog = true
            this.employee = { ...employee }
        },
        close() {
            this.showDialog = false
            this.employee = {}
        },
        getTeams() {
            const url = `${baseApiUrl}/teams`
            axios.get(url).then(res => {
                this.teams = res.data
            })
        }
    },
    watch: {
        page() {
            this.loadEmployees()
        }
    },
    mounted() {
        this.loadEmployees()
        this.getTeams()
    }
}
</script>

<style>
    .md-dialog {
        max-width: 768px;
        width: 768px;
    }
</style>
