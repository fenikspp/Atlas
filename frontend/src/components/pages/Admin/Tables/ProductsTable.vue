<template>
    <div class="md-content">
        <div class="cadastro">
            <md-dialog :md-active.sync="showDialog">
                <md-card class="md-layout-item md-size-100 md-small-size-100">
                    <md-card-header data-background-color="blue">
                        <h4 class="title">Cadastro de Produtos</h4>
                        <p class="category">Informe os dados do Produto</p>
                    </md-card-header>
                    <md-card-content>
                        <form novalidate class="md-layout" @submit.prevent="validateUser">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Segmento</label>
                                    <md-select v-model="product.segmento">
                                        <md-option :key="item" v-for="item in segmentos" :value="item">{{item}}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Nome</label>
                                    <md-input v-model="product.produto"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Pontos</label>
                                    <md-input v-model="product.pontos"></md-input>
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
        </div>
        <md-button class="md-just-icon md-simple md-info" @click="showDialog = true">
                <md-icon>library_add</md-icon>
                <md-tooltip md-direction="top">Adicionar Produto</md-tooltip>
            </md-button>
        <b-table hover striped :items="products" :fields="fields"> <!--  -->
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
    name: 'ProductsTable',
    data() {
        return {
            product: {},
            products: [],
            showDialog: false,
            segmentos: [ 
                'Voz', 'Dados', 'TV', 
                'Controle', 'Pós Puro', 
                'Pós Família', 'SVA', 'Pcte TV' 
            ],
            fields: [
                { key: 'idproducts', label: 'Código', sortable: true },
                { key: 'segmento', label: 'Segmento', sortable: true },
                { key: 'produtos', label: 'Produto', sortable: true },
                { key: 'pontos', label: 'Pontos', sortable: true },
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        save() {
            const method = this.product.idproducts ? 'put' : 'post'
            const id = this.product.idproducts ? `/${this.product.idproducts}` : '' 
            axios[method](`${baseApiUrl}/products${id}`, this.product)
            .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.showDialog = false
                    this.product = {}
                    location.reload();
                })
                .catch(showError)
        },
        close() {
            this.showDialog = false
            this.product = {}
        },
        loadProducts() {
            const url = `${baseApiUrl}/products`
            axios.get(url).then(res => {
                this.products = res.data
            })
        }
    },
    mounted() {
        this.loadProducts()
    }
}
</script>

<style>

</style>
