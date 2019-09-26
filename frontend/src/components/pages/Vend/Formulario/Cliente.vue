<template>
    <form>
        <md-card>
            <md-card-header data-background-color="blue">
                <h4 class="title">Dados do Cliente</h4>
                <p class="category">Informe os dados do Cliente</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-radio v-model="client_type" :value="false" class="md-primary" >Pessoa Física</md-radio>
                        <md-radio v-model="client_type" :value="true" class="md-primary">Pessoa Jurídica</md-radio>
                        <md-input type="hidden" v-model="sales_for_now.id_vendedor"></md-input>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <md-icon>account_circle</md-icon>
                            <label>Nome</label>
                            <md-input v-model="sales_for_now.name" type="text"></md-input>
                        </md-field>
                    </div>
                    
                    <div class="md-layout-item md-small-size-100 md-size-25">
                        <md-field v-if="client_type">
                            <label>CNPJ</label>
                            <md-input v-model="sales_for_now.cnpj" type="text" v-mask="'##.###.###/####-##'"></md-input>
                        </md-field>
                        <md-field v-else>
                            <label>CPF</label>
                            <md-input v-model="sales_for_now.cpf" type="text" v-mask="'###.###.###-##'"></md-input>
                        </md-field>
                    </div>
                    <div v-if="!client_type" class="md-layout-item md-small-size-100 md-size-25">
                        <md-datepicker v-model="sales_for_now.birthday" md-immediately>
                            <label>Data de Nascimento</label>
                        </md-datepicker>
                    </div>
                    <div v-if="!client_type" class="md-layout-item md-small-size-100 md-size-100">
                        <label class="title">Gênero</label>
                        <div class="input">
                            <md-radio v-model="sales_for_now.gender" value="m" class="md-primary">Masculino</md-radio>
                            <md-radio v-model="sales_for_now.gender" value="f" class="md-primary">Feminino</md-radio>
                        </div>  
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <md-icon>mail</md-icon>
                            <label>E-mail</label>
                            <md-input v-model="sales_for_now.email" type="email"></md-input>
                        </md-field>
                    </div>
                    <div v-if="!client_type" class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Nome da Mãe</label>
                            <md-input v-model="sales_for_now.mother_name" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-10">
                        <md-field>
                            <md-icon>contact_phone</md-icon>
                            <label>DDD</label>
                            <md-input v-model="sales_for_now.ddd" type="text" v-mask="'##'"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Telefone Residencial</label>
                            <md-input v-model="sales_for_now.number_res" type="text" v-mask="'####-####'"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Telefone Comercial</label>
                            <md-input v-model="sales_for_now.number_com" type="text" v-mask="'####-####'"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Telefone Celular</label>
                            <md-input v-model="sales_for_now.number_cel" type="text" v-mask="'# ####-####'"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label>Endereço</label>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                        <md-field>
                            <md-icon>location_city</md-icon>
                            <label>Estado</label>
                            <md-select v-model="sales_for_now.uf" @md-selected="getCidades()">
                                <md-option value="DF">Distrito Federal</md-option>
                                <md-option value="AC">Acre</md-option>
                                <md-option value="AL">Alagoas</md-option>
                                <md-option value="AP">Amapá</md-option>
                                <md-option value="AM">Amazonas</md-option>
                                <md-option value="BA">Bahia</md-option>
                                <md-option value="CE">Ceará</md-option>
                                <md-option value="ES">Espírito Santo</md-option>
                                <md-option value="GO">Goiás</md-option>
                                <md-option value="MA">Maranhão</md-option>
                                <md-option value="MT">Mato Grosso</md-option>
                                <md-option value="MS">Mato Grosso do Sul</md-option>
                                <md-option value="MG">Minas Gerais</md-option>
                                <md-option value="PA">Pará</md-option>
                                <md-option value="PB">Paraíba</md-option>
                                <md-option value="PR">Paraná</md-option>
                                <md-option value="PE">Pernambuco</md-option>
                                <md-option value="PI">Piauí</md-option>
                                <md-option value="RJ">Rio de Janeiro</md-option>
                                <md-option value="RN">Rio Grande do Norte</md-option>
                                <md-option value="RS">Rio Grande do Sul</md-option>
                                <md-option value="RO">Rondônia</md-option>
                                <md-option value="RR">Roraima</md-option>
                                <md-option value="SC">Santa Catarina</md-option>
                                <md-option value="SP">São Paulo</md-option>
                                <md-option value="SE">Sergipe</md-option>
                                <md-option value="TO">Tocantins</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25" v-if="sales_for_now.uf != 'DF'">
                        <md-autocomplete v-model="sales_for_now.municipio" :md-options="municipios" :md-open-on-focus="false">
                            <label>Município</label>
                        </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                        <md-autocomplete v-model="sales_for_now.cidade" :md-options="cidades" :md-open-on-focus="false">
                            <label>Cidade</label>
                        </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                        <md-field>
                            <label>Bairro</label>
                            <md-input v-model="sales_for_now.bairro" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-75 md-size-25">
                        <md-field>
                            <label>Quadra</label>
                            <md-input v-model="sales_for_now.quadra" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-25 md-size-10">
                        <md-field>
                            <label>N°</label>
                            <md-input v-model="sales_for_now.numero_quadra" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-75 md-size-25">
                        <md-field>
                            <label>Conjunto</label>
                            <md-input v-model="sales_for_now.conjunto" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-25 md-size-10">
                        <md-field>
                            <label>N°</label>
                            <md-input v-model="sales_for_now.numero_conjunto" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-75 md-size-25">
                        <md-field>
                            <label>Chacara</label>
                            <md-input v-model="sales_for_now.chacara" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-25 md-size-10">
                        <md-field>
                            <label>N°</label>
                            <md-input v-model="sales_for_now.numero_chacara" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Casa</label>
                            <md-input v-model="sales_for_now.casa" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-70">
                        <md-field>
                            <label>Complemento</label>
                            <md-input v-model="sales_for_now.complemento" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>CEP</label>
                            <md-input v-model="sales_for_now.cep" type="text" v-mask="'#####-###'"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Logradouro Completo</label>
                            <md-input v-model="sales_for_now.logradouro" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label>Produtos</label>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Voz</label>
                            <md-select v-model="sales_for_now.voz">
                                <md-option :key="item" v-for="item in voz" :value="item.produtos">{{item.produtos}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field>
                            <label>Banda Larga</label>
                            <md-select v-model="sales_for_now.dados">
                                <md-option v-bind:key="item" v-for="item in dados" :value="item.produtos">{{item.produtos}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field>
                            <label>Tecnologia</label>
                            <md-select v-model="sales_for_now.tecnologia">
                                <md-option value="metalico">Metalico</md-option>
                                <md-option value="gpon">GPON</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-20">
                        <md-field>
                            <label>TV</label>
                            <md-select v-model="sales_for_now.tv">
                                 <md-option :key="item" v-for="item in tv" :value="item.produtos">{{item.produtos}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Pontos Adicionais</label>
                            <md-select v-model="sales_for_now.pontos_adicionais">
                                <md-option value="1">1 Pontos</md-option>
                                <md-option value="2">2 Pontos</md-option>
                                <md-option value="3">3 Pontos</md-option>
                                <md-option value="4">4 Pontos</md-option>
                                <md-option value="5">5 Pontos</md-option>
                                <md-option value="6">6 Pontos</md-option>
                                <md-option value="7">7 Pontos</md-option>
                                <md-option value="8">8 Pontos</md-option>
                                <md-option value="9">9 Pontos</md-option>
                                <md-option value="10">10 Pontos</md-option>
                                <md-option value="11">11 Pontos</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-70">
                        <md-field>
                            <label>TV - Pacotes a La Carte</label>
                            <md-input v-model="sales_for_now.tv_lacart"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label>Móvel Vivo</label>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-40">
                        <md-field>
                            <label>Plano Controle</label>
                            <md-select v-model="sales_for_now.controle">
                                <md-option :key="item" v-for="item in controle" :value="item.produtos">{{item.produtos}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-datepicker v-model="sales_for_now.data_vencimento" md-immediately>
                            <label>Data de Vencimento</label>
                        </md-datepicker>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-30">
                        <md-field>
                            <label>Recebimento - Fatura</label>
                            <md-select v-model="sales_for_now.fatura">
                                <md-option value="boleto">Boleto</md-option>
                                <md-option value="conta">Conta Digital</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <VueEditor v-model="sales_for_now.content"
                            placeholder="Insira o RG e o comprovante de residência do cliente!"/>
                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button @click="saveSale()" class="md-info">Criar Venda</md-button>
            </md-card-actions>
        </md-card>

    </form>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl, showError } from '../../../../config/js/Global'

export default {
    name: 'Cliente',
    components: { VueEditor },
    computed: mapState(['employeer']),
    data() {
        return {
            client_type: false,
            client: {},
            phone: {},
            address: {},
            cidades: [],
            municipios: [],
            bairros: [],
            quadras: [],
            casas: [],
            conjuntos: [],
            complemento: [],
            produto: {},
            sales_products: {},
            produtos: [],
            voz: [],
            dados: [],
            tv: [],
            controle: [],
            saleSaved: false,
            sending: false,
            lastSale: null,
            pontuacao_total: 0,
            sales_for_now: {
            }
        }
    },
    methods: {
        dateFormat() {
                this.$material.locale.dateFormat = "dd/MM/yyyy"
        },
        save() {
            if(this.sales_products.voz) {
                this.pontuacao_total = this.pontuacao_total += parseInt(this.sales_products.voz.pontos)
            }
            if(this.sales_products.banda) {
                this.pontuacao_total += parseInt(this.sales_products.banda.pontos)
            }
            // eslint-disable-next-line                        
            //console.log(this.pontuacao_total)
            //this.pontuacao_total = 0
        },
        clearForm() {
            this.$v.$reset()
            this.client_type = null
            this.client = {}
            this.phone = {}
            this.address = {}
            this.cidades = []
            this.municipios = []
            this.bairros = []
            this.quadras = []
            this.casas = []
            this.conjuntos = []
            this.complemento = []
            this.produto = {}
            this.sales_products = {}
            this.sales_for_now = {}
        },
        saveSale() {
            this.sending = true
            this.sales_for_now.id_vendedor = parseInt(this.$store.state.employeer.id)
            axios.post(`${baseApiUrl}/sales`, this.sales_for_now)
                .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.saleSaved = true
                        this.clear()
                    })
                .catch(showError)

            /*
            const all_data = { 
                name: this.client.name, cpf: this.client.cpf, birthday: this.client.birthday, 
                mother_name: this.client.mother_name, gender: this.client.gender, email: this.client.email, 
                rg: this.client.rg, ddd: this.phone.ddd, number_res: this.phone.number_res, number_com: this.phone.number_com, 
                number_cel: this.client.number_cel, uf: this.address.uf, municipio: this.address.municipio, 
                cidade: this.address.cidade, bairro: this.address.bairro, quadra: this.address.quadras, 
                numero_quadra: this.address.numero_quadra, conjunto: this.address.conjunto, 
                numero_conjuto: this.address.numero_conjuto, chacara: this.address.chacara, 
                numero_chacara: this.address.numero_chacara, casa: this.address.casa, 
                complemento: this.address.complemento, cep: this.address.cep, logradouro: this.address.logradouro  
            }
            */
            /*window.setTimeout(() => {
                //const link = this.client_type ? '/enties' : '/individuals'
                const link = '/sales'
                //console.log(this.id_vendedor)
                this.sales_for_now.id_vendedor = parseInt(this.$store.state.employeer.id)
                axios.post(`${baseApiUrl}${link}`, this.sales_for_now)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.saleSaved = true
                        this.clear()
                    })
                    .catch(showError)
                this.lastSale = `${this.sales_for_now.email}`
                this.sending = false
                //document.location.href = '#'
            }, 1500) */
        },
        clear() {
            this.sales_for_now = {}
        },
        getCidades() {
            if(this.sales_for_now.uf == 'DF') {
                this.address.municipio = 'Brasília'
                this.sales_for_now.municipio = 'Brasília'
                this.cidades = [
                    'Águas Claras',
                    'Arniqueiras',
                    'Brasília',
                    'Brazlândia',
                    'Candangolândia',
                    'Ceilândia',
                    'Cruzeiro',
                    'Fercal',
                    'Gama',
                    'Guará',
                    'Itapoã',
                    'Jardim Botânico',
                    'Lago Norte',
                    'Lago Sul',
                    'Núcleo Bandeirante',
                    'Paranoá',
                    'ParkWay',
                    'Planaltina',
                    'Recanto das Emas',
                    'Riacho Fundo I',
                    'Riacho Fundo II',
                    'Samambaia',
                    'Santa Maria',
                    'São Sebastião',
                    'SCIA',
                    'SIA',
                    'Sobradinho',
                    'Sobradinho II',
                    'Sudoeste',
                    'Sol Nascente',
                    'Octogonal',
                    'Taguatinga',
                    'Varjão',
                    'Vicente Pires'
                ]
            } else {
                this.cidades = []
            }
        },
        getproduct_voz() {
            const url = `${baseApiUrl}/products/Voz`
            axios.get(url).then(res => {
                this.voz = res.data
            })
        },
        getproduct_dados() {
            const url = `${baseApiUrl}/products/Dados`
            axios.get(url).then(res => {
                this.dados = res.data
            })
        },
        getproduct_tv() {
            const url = `${baseApiUrl}/products/TV`
            axios.get(url).then(res => {
                this.tv = res.data
            })
        },
        getproduct_controle() {
            const url = `${baseApiUrl}/products/Controle`
            axios.get(url).then(res => {
                this.controle = res.data
            })
        }
    },
    mounted() {
        this.dateFormat()
        this.getproduct_voz()
        this.getproduct_dados()
        this.getproduct_tv()
        this.getproduct_controle()
    }
}
</script>

<style>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    .md-card .md-card-actions {
        border-top: 0px;
    }
</style>
