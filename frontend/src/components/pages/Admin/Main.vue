<template>
    <div class="content">
        <md-card>
            <md-card-content>
                <b-card no-body>
                    <b-tabs card active-nav-item-class="text-info" nav-item-class=" text-danger">
                        <b-tab title="Usuários" active :title-link-class="'text-info'">
                            <UserTable />
                        </b-tab>
                        <b-tab title="Equipes" :title-link-class="'text-info'">
                            <TeamsTable />
                        </b-tab>
                        <b-tab title="Produtos" :title-link-class="'text-info'">
                            <Products />
                        </b-tab>
                    </b-tabs>
                </b-card>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import UserTable from './Tables/UserTable.vue'
import Products from './Tables/ProductsTable.vue'
import TeamsTable from './Tables/Teams.vue'

export default {
    name: 'Admin',
    components: { UserTable, Products, TeamsTable }

}
</script>

<style>

</style>
