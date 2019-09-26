<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
                <stats-card data-background-color="orange">
                    <template slot="header">
                        <md-icon>supervisor_account</md-icon>
                    </template>
                    <template slot="content">
                        <p class="category">Usuários</p>
                        <h3 class="title">{{ stat.employees }}</h3>
                    </template>
                    <template slot="footer">
                        <div class="stats">
                            <md-icon>access_time</md-icon>
                            Atualizado dia: {{ stat.updatedAt.slice(8, 10) }}/{{ stat.updatedAt.slice(5, 7) }}/{{ stat.updatedAt.slice(0, 4) }} às {{ stat.createdAt.slice(16, 21) }}
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
                        <p class="category">Vendas</p>
                        <h3 class="title">{{ stat.sales}}</h3>
                    </template>
                    <template slot="footer">
                        <div class="stats">
                            <md-icon>access_time</md-icon>
                            Em processo
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
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>

</style>
