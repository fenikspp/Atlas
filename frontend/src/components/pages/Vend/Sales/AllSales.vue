<template>
    <div>
        <b-table hover striped :items="sales" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="secondary" @click="loadSale(data.item)" class="mr-2">
                    <md-icon>visibility</md-icon>
                    <md-tooltip md-direction="top">Visualizar</md-tooltip>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl } from '../../../../config/js/Global'
import axios from 'axios'

export default {
    name: 'Sales',
    data() {
        return {
            sale: {},
            sales: [],
            showDialog: false,
            fields: [
                { key: 'status', label: 'Status', sortable: true,
                    formatter: (value) => {
                        if (value == 'Enviado') {
                            this.$variant = "info"
                            return value
                        }
                    } 
                },
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'actions', label: 'Ações' }
            
            ]
        }
    },
    methods: {
        loadSales() {
            let id = parseInt(this.$store.state.employeer.id)
            const url = `${baseApiUrl}/sales/employeer/${id}`
            axios.get(url).then(res => {
                this.sales = res.data
            })
        },
        loadSale() {
            this.showDialog = true
        }
    },
    mounted() {
        this.loadSales()
    }

}
</script>

<style>

</style>
