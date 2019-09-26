<template>
    <div class="content">
        <md-card>
            <md-card-content>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Enviadas" active>
                            <allsales />
                        </b-tab>
                        <b-tab title="Concluida">
                            <CategoryAdmin />
                        </b-tab>
                        <b-tab title="Canceladas">
                            <UserAdmin />
                        </b-tab>
                    </b-tabs>
                </b-card>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import allsales from './AllSales.vue'

export default {
    name: 'Sales',
    components: { allsales }
}
</script>

<style>

</style>
