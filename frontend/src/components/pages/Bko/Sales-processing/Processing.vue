<template>
    <div>
        <div class="md-content">
            <form>
                <md-card v-if="showDialog && sale.status" class="md-layout-item md-size-100 md-small-size-100" >
                    <md-card-header data-background-color="blue">
                        <h4 class="title">Tratamento de Venda</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <label>Vendedor</label>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>Nome</label>
                                    <md-input v-model="sale.nomeVendedor" type="text" readonly ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50" hidden>
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>Nome</label>
                                    <md-input v-model="sale.vendedor" type="text" readonly ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>Equipe</label>
                                    <md-input v-model="sale.team" type="text" readonly></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <label>Cliente</label>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>Nome</label>
                                    <md-input v-model="sale.cliente" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50" v-if="sale.cpf">
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>CPF</label>
                                    <md-input v-model="sale.cpf" type="text" v-mask="'###.###.###-##'" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50" v-else>
                                <md-field>
                                    <md-icon>account_circle</md-icon>
                                    <label>CNPJ</label>
                                    <md-input v-model="sales.cnpj" type="text" v-mask="'##.###.###/####-##'" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div v-if="sale.cpf" class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Data de nascimento</label>
                                    <md-input v-model="sale.birthday" v-mask="'####/##/##'" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div v-if="sale.cpf" class="md-layout-item md-small-size-100 md-size-50">
                                <label class="title">Gênero</label>
                                <div class="input">
                                    <md-radio v-model="sale.gender" value="m" class="md-primary" :disabled="mode === 'view'">Masculino</md-radio>
                                    <md-radio v-model="sale.gender" value="f" class="md-primary" :disabled="mode === 'view'">Feminino</md-radio>
                                </div>  
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50" v-if="sale.cpf">
                                <md-field>
                                    <md-icon>mail</md-icon>
                                    <label>E-mail</label>
                                    <md-input v-model="sale.email" type="email" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div v-if="sale.cpf" class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Nome da Mãe</label>
                                    <md-input v-model="sale.mother_name" type="text" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100" v-if="sale.cnpj">
                                <md-field>
                                    <md-icon>mail</md-icon>
                                    <label>E-mail</label>
                                    <md-input v-model="sale.email" type="email" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-20 md-size-10">
                                <md-field>
                                    <md-icon>contact_phone</md-icon>
                                    <label>DDD</label>
                                    <md-input v-model="sale.ddd" type="text" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-40 md-size-33">
                                <md-field>
                                    <label>Telefone Residencial</label>
                                    <md-input v-model="sale.number_res" type="text" v-mask="'####-####'" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-40 md-size-33">
                                <md-field>
                                    <label>Telefone Comercial</label>
                                    <md-input v-model="sale.number_com" type="text" v-mask="'####-####'" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Telefone Celular</label>
                                    <md-input v-model="sale.number_cel" type="text" v-mask="'# ####-####'" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-25 md-size-10">
                                <md-field>
                                    <label>Estado</label>
                                    <md-input v-model="sale.uf" type="text" :readonly="mode === 'view'" ></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-75 md-size-33">
                                <md-field>
                                    <label>Município</label>
                                    <md-input v-model="sale.municipio" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-50 md-size-33">
                                <md-field>
                                    <label>Cidade</label>
                                    <md-input v-model="sale.cidade" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-50 md-size-32">
                                <md-field>
                                    <label>Bairro</label>
                                    <md-input v-model="sale.bairro" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-75 md-size-20">
                                <md-field>
                                    <label>Quadra</label>
                                    <md-input v-model="sale.quadra" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-25 md-size-10">
                                <md-field>
                                    <label>Nº</label>
                                    <md-input v-model="sale.numero_quadra" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-75 md-size-20">
                                <md-field>
                                    <label>Chácara</label>
                                    <md-input v-model="sale.chacara" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-25 md-size-20">
                                <md-field>
                                    <label>Nº</label>
                                    <md-input v-model="sale.numero_chacara" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-75 md-size-20">
                                <md-field>
                                    <label>Conjunto</label>
                                    <md-input v-model="sale.conjunto" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-25 md-size-10">
                                <md-field>
                                    <label>Nº</label>
                                    <md-input v-model="sale.numero_conjunto" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-25 md-size-20">
                                <md-field>
                                    <label>Casa</label>
                                    <md-input v-model="sale.casa" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-75 md-size-80">
                                <md-field>
                                    <label>Complemento</label>
                                    <md-input v-model="sale.complemento" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-20">
                                <md-field>
                                    <label>Cep</label>
                                    <md-input v-model="sale.cep" type="text" v-mask="'#####-###'" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-80">
                                <md-field>
                                    <label>logradouro Completo</label>
                                    <md-input v-model="sale.logradouro" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <label>Produtos</label>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Voz</label>
                                    <md-input v-model="sale.voz" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Banda Larga</label>
                                    <md-input v-model="sale.dados" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Tecnologia</label>
                                    <md-input v-model="sale.tecnologia" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>TV</label>
                                    <md-input v-model="sale.tv" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Pontos Adicionais</label>
                                    <md-input v-model="sale.pontos_adicionais" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Pacotes a La Carte</label>
                                    <md-input v-model="sale.tv_lacart" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Plano Controle - Movel Vivo</label>
                                    <md-input v-model="sale.controle" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-32">
                                <md-field>
                                    <label>Data de vencimento</label>
                                    <md-input v-model="sale.data_vencimento" v-mask="'####/##/##'" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Fatura</label>
                                    <md-input v-model="sale.fatura" type="text" :readonly="mode === 'view'"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Pontuação Total</label>
                                    <md-input v-model="ptotal" type="text" readonly></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Status</label>
                                    <md-select v-model="sale.status" :disabled="mode === 'view'">
                                        <md-option :key="item" v-for="item in selectstatus" :value="item">{{item}}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <VueEditor v-model="sale.content"/>
                            </div>
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-secondary" @click="close()">Fechar</md-button>
                        <md-button class="md-success" @click="save()" v-if="mode !== 'view'">Salvar</md-button>
                    </md-card-actions>
                </md-card>
            </form>
        </div>
        <b-table hover striped :items="sales" :fields="fields" :tbody-tr-class="rowClass(sales)">
            <template slot="actions" slot-scope="data">
                <b-button variant="info" @click="loadSale(data.item)" class="mr-2">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Editar</md-tooltip>
                </b-button>
                <b-button variant="secondary" @click="loadViewSale(data.item)" class="mr-2">
                    <md-icon>visibility</md-icon>
                    <md-tooltip md-direction="top">Visualizar</md-tooltip>
                </b-button>
            </template>
        </b-table>
        <div class="md-layout-item md-small-size-100 md-size-100 mt-4">
            <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '../../../../config/js/Global'
import axios from 'axios'

export default {
    name: 'Processing',
    components: { VueEditor },
    data() {
        return {
            sale: {},
            sales: [],
            showDialog: false,
            mode: 'save',
            ptotal: 0,
            page: 1,
            limit: 0,
            count: 0,
            selectstatus: [
                'Enviado', 'Em Auditoria', 'Aguardando SOS',
                'Pendente Instalação', 'Instalada', 'Cancelamento Comercial',
                'Cancelamento Técnico', 'Suspeita de Fraude', 'Pendente Confirmação',
                'Reprovada Total', 'Reprovada TV', 'Pendente Adequação', 'Inviabilidade Técnica',
                'Cancelada Outros', 'Pendente Input', 'Tratamento'
            ],
            fields: [
                { key: 'status', label: 'Status', sortable: true},
                { key: 'cliente', label: 'Nome', sortable: true},
                { key: 'nomeVendedor', label: 'Vendedor', sortable: true},
                { key: 'actions', label: 'Ações' }
            
            ]
        }
    },
    methods: {
        async save() {
            
            let updatedSale = {}
            updatedSale.id = this.sale.codigo
            updatedSale.id_vendedor = this.sale.vendedor
            updatedSale.name = this.sale.cliente
            updatedSale.email = this.sale.email
            updatedSale.gender = this.sale.gender
            updatedSale.status = this.sale.status
            updatedSale.cpf = this.sale.cpf
            updatedSale.cnpj = this.sale.cnpj
            updatedSale.birthday = this.sale.birthday
            updatedSale.mother_name = this.sale.mother_name
            updatedSale.ddd = this.sale.ddd
            updatedSale.number_res = this.sale.number_res
            updatedSale.number_com = this.sale.number_com
            updatedSale.number_cel = this.sale.number_cel
            updatedSale.uf = this.sale.uf
            updatedSale.municipio = this.sale.municipio
            updatedSale.cidade = this.sale.cidade
            updatedSale.bairro = this.sale.bairro
            updatedSale.quadra = this.sale.quadra
            updatedSale.numero_quadra = this.sale.numero_quadra
            updatedSale.conjunto = this.sale.conjunto
            updatedSale.numero_conjunto = this.sale.numero_conjunto
            updatedSale.chacara = this.sale.chacara
            updatedSale.numero_chacara = this.sale.numero_chacara
            updatedSale.casa = this.sale.casa
            updatedSale.complemento = this.sale.complemento
            updatedSale.logradouro = this.sale.logradouro
            updatedSale.cep = this.sale.cep
            updatedSale.content = this.sale.content
            updatedSale.voz = this.sale.voz
            updatedSale.dados = this.sale.dados 
            updatedSale.tecnologia = this.sale.tecnologia
            updatedSale.tv = this.sale.tv
            updatedSale.pontos = this.ptotal
            updatedSale.pontos_adicionais = this.sale.pontos_adicionais
            updatedSale.tv_lacart = this.sale.tv_lacart
            updatedSale.controle = this.sale.controle
            updatedSale.data_vencimento = this.sale.data_vencimento
            updatedSale.fatura = this.sale.fatura
            

            axios.put(`${baseApiUrl}/saleprocessing/${updatedSale.id}`, updatedSale)
                .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.showDialog = false
                        location.reload()
                    })
                .catch(showError)

        },
        loadSales() {
            const url = `${baseApiUrl}/sales/?page=${this.page}`
            axios.get(url).then(res => {
                this.sales = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadViewSale(sale, mode = 'view'){
            this.ptotal = 0
            axios.get(`${baseApiUrl}/saleprocessing/${sale.codigo}`)
                .then(res => this.sale = res.data)
        
            if (sale.voz_pontos) {
                this.ptotal += parseInt(sale.voz_pontos)
            }
            if (sale.dados_pontos) {
                this.ptotal += parseInt(sale.dados_pontos)
            }
            if (sale.tv_pontos) {
                this.ptotal += parseInt(sale.tv_pontos)
            }
            if (sale.controle_pontos) {
                this.ptotal += parseInt(sale.controle_pontos)
            }
            this.showDialog = true
            this.mode = mode
            window.scrollTo(0, 0)
        },
        loadSale(sale, mode = 'save') {
            this.ptotal = 0
            axios.get(`${baseApiUrl}/saleprocessing/${sale.codigo}`)
                .then(res => this.sale = res.data)
        
            if (sale.voz_pontos) {
                this.ptotal += parseInt(sale.voz_pontos)
            }
            if (sale.dados_pontos) {
                this.ptotal += parseInt(sale.dados_pontos)
            }
            if (sale.tv_pontos) {
                this.ptotal += parseInt(sale.tv_pontos)
            }
            if (sale.controle_pontos) {
                this.ptotal += parseInt(sale.controle_pontos)
            }
            this.showDialog = true
            this.mode = mode
            window.scrollTo(0, 0)
        },
        async close() {

            let updatedSale = {}
            updatedSale.id = this.sale.codigo
            updatedSale.id_vendedor = this.sale.vendedor
            updatedSale.name = this.sale.cliente
            updatedSale.email = this.sale.email
            updatedSale.gender = this.sale.gender
            updatedSale.status = this.sale.status
            updatedSale.cpf = this.sale.cpf
            updatedSale.cnpj = this.sale.cnpj
            updatedSale.birthday = this.sale.birthday
            updatedSale.mother_name = this.sale.mother_name
            updatedSale.ddd = this.sale.ddd
            updatedSale.number_res = this.sale.number_res
            updatedSale.number_com = this.sale.number_com
            updatedSale.number_cel = this.sale.number_cel
            updatedSale.uf = this.sale.uf
            updatedSale.municipio = this.sale.municipio
            updatedSale.cidade = this.sale.cidade
            updatedSale.bairro = this.sale.bairro
            updatedSale.quadra = this.sale.quadra
            updatedSale.numero_quadra = this.sale.numero_quadra
            updatedSale.conjunto = this.sale.conjunto
            updatedSale.numero_conjunto = this.sale.numero_conjunto
            updatedSale.chacara = this.sale.chacara
            updatedSale.numero_chacara = this.sale.numero_chacara
            updatedSale.casa = this.sale.casa
            updatedSale.complemento = this.sale.complemento
            updatedSale.logradouro = this.sale.logradouro
            updatedSale.cep = this.sale.cep
            updatedSale.content = this.sale.content
            updatedSale.voz = this.sale.voz
            updatedSale.dados = this.sale.dados 
            updatedSale.tecnologia = this.sale.tecnologia
            updatedSale.tv = this.sale.tv
            updatedSale.pontos = this.ptotal
            updatedSale.pontos_adicionais = this.sale.pontos_adicionais
            updatedSale.tv_lacart = this.sale.tv_lacart
            updatedSale.controle = this.sale.controle
            updatedSale.data_vencimento = this.sale.data_vencimento
            updatedSale.fatura = this.sale.fatura
            

            axios.put(`${baseApiUrl}/saleprocessing/${updatedSale.id}`, updatedSale)
                .then(() => {
                        this.showDialog = false
                    })
                .catch(showError)
            
            if (this.sale.status != 'Tratamento') {
                this.showDialog = false
                this.sale = {}
                this.ptotal = 0
            } else {
                this.$toasted.global.defaultError({ msg: `Altere o status antes de Salvar ou Fechar a venda!!!`})
            }
        },
        dateFormat() {
                this.$material.locale.dateFormat = "dd/MM/yyyy"
        },
        rowClass() {
            
        }
    },
    watch: {
        page() {
            this.loadSales()
        }
    },
    mounted() {
        this.loadSales()
        this.dateFormat()
    }

}
</script>

<style>

</style>
