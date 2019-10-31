<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
                <stats-card data-background-color="orange">
                    <template slot="header">
                        <md-icon>supervisor_account</md-icon>
                    </template>
                    <template slot="content">
                        <p class="category">Usuários</p>
                        <h3 class="title">{{ stat.employeesCount }}</h3>
                    </template>
                    <template slot="footer">
                        <div class="stats">
                            <md-icon>access_time</md-icon>
                            Atualizado 
                        </div>
                    </template>
                </stats-card> 
                
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
                <stats-card data-background-color="blue">
                    <template slot="header">
                        <md-icon>business</md-icon>
                    </template>
                    <template slot="content">
                        <p class="category">Vendas do Mês</p>
                        <h3 class="title">{{ salesPerMonth }}</h3>
                    </template>
                    <template slot="footer">
                        <div class="stats">
                            <md-icon>access_time</md-icon>
                            Mês {{currentmonth}}, {{year}}
                        </div>
                    </template>
                </stats-card>
            </div>
        </div>
    </div>

</template>

<script>
import StatsCard from '../../plugins/Cards/StatsCard.vue'
import axios from 'axios'
import { baseApiUrl } from '../../../config/js/Global'

export default {
    name: 'Stats',
    components: { StatsCard },
    data() {
        return{
            stat: {},
            employees: null,
            current: null,
            currentCreated: null,
            day: null,
            time: null,
            monthForStat: null,
            yearForStat: null,
            salesPerMonth: {},
            currentmonth: '',
            month: null,
            year: null
        }
    },
    methods: {
        /* async getStats() {
            await axios.get(`${baseApiUrl}/stats`)
                .then((res) => {
                    this.stat = res.data
                })

            this.employees = this.stat.employees
            if (this.stat.updatedAt != null) {
                this.current = this.stat.updatedAt
            }
            if (this.stat.createdAt != null) {
                this.currentCreated = this.stat.createdAt
            }

            this.day = this.current.slice(8, 10)
            this.monthForStat = this.current.slice(5, 7)
            this.yearForStat = this.current.slice(0, 4)
            this.time = this.currentCreated.slice(16, 21)
            
        }, */
        getSalesPerDate() {
            this.month = new Date()
            this.month = this.month.getMonth()
            this.year = new Date()
            this.year = this.year.getFullYear()
            const year = this.year
            const month = parseInt(this.month) + 1
            axios.get(`${baseApiUrl}/statstest/?month=${month}&year=${year}`)
                .then((res) => {
                    this.salesPerMonth = res.data.countSalesPerMonth
                    this.stat.employeesCount = res.data.countEmployeesAll
                })
        },
        mountCurrentMonth() {
            switch (this.month) {
                case 0:
                    this.currentmonth = 'Janeiro'
                    break;
                case 1:
                    this.currentmonth = 'Fevereiro'
                    break;
                case 2:
                    this.currentmonth = 'Março'
                    break;
                case 3:
                    this.currentmonth = 'Abril'
                    break;
                case 4:
                    this.currentmonth = 'Maio'
                    break;
                case 5:
                    this.currentmonth = 'Junho'
                    break;
                case 6:
                    this.currentmonth = 'Julho'
                    break;
                case 7:
                    this.currentmonth = 'Agosto'
                    break;
                case 8:
                    this.currentmonth = 'Setembro'
                    break;
                case 9:
                    this.currentmonth = 'Outubro'
                    break;
                case 10:
                    this.currentmonth = 'Novembro'
                    break;
                case 11:
                    this.currentmonth = 'Dezembro'
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
        //this.getStats()
        this.getSalesPerDate()
        this.mountCurrentMonth()
    }
}
</script>

<style>

</style>
