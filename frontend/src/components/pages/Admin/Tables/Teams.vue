<template>
    <div>
        <div>
            <md-dialog :md-active.sync="showDialog">
                <md-card class="md-layout-item md-size-100 md-small-size-100">
                    <md-card-header data-background-color="blue">
                        <h4 class="title">Cadastro de Equipes</h4>
                        <p class="category">Informe os dados da Equipe</p>
                    </md-card-header>
                    <md-card-cont>
                        <form novalidate class="md-layout" @submit.prevent="validateUser">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Nome</label>
                                    <md-input v-model="team.name"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Supervisor</label>
                                    <md-select v-model="team.supervisor">
                                        <md-option :key="item" v-for="item in supervisor" :value="item.idemployees">{{item.name}}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </form>
                    </md-card-cont>
                    <md-card-actions>
                        <md-button class="md-secondary" @click="close()">Fechar</md-button>
                        <md-button class="md-success" @click="save()">Salvar</md-button>
                    </md-card-actions>
                </md-card>
            </md-dialog>
            <md-button class="md-just-icon md-simple md-info" @click="showDialog = true">
                <md-icon>group_add</md-icon>
                <md-tooltip md-direction="top">Adicionar Equipe</md-tooltip>
            </md-button>
        </div>
        <b-table hover striped :items="teams" :fields="fields">
             <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Editar</md-tooltip>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <md-icon>close</md-icon>
                    <md-tooltip md-direction="top">Excluir</md-tooltip>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../../../config/js/Global'
import axios from 'axios'

export default {
    name: 'TeamsTable',
    data() {
        return {
            team: {},
            teams: [],
            showDialog: false,
            supervisor: [],
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'supervisor', label: 'Supervisor', sortable: true },
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        save() {
            const url = `${baseApiUrl}/teams`
            axios.post(url, this.team)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.showDialog = false
                    this.team = {}
                    location.reload();
                })
                .catch(showError)
        },
        loadTeams() {
            const url = `${baseApiUrl}/teams`
            axios.get(url).then(res => {
                this.teams = res.data
            })
        },
        close() {
            this.showDialog = false
            this.team = {}
        },
        getSupervisor() {
            const url = `${baseApiUrl}/employees`
                axios.get(url).then(res => {
                    this.supervisor = res.data.data
                })
        }
    },
    mounted() {
        this.loadTeams()
        this.getSupervisor()
    }
}
</script>

<style>
    .md-dialog {
        max-width: 768px;
        width: 768px;
    }
</style>
