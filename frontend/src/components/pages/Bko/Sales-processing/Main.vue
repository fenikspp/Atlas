<template>
    <div class="content">
        <md-card>
            <md-card-content>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Vendas" active>
                            <Processing />
                        </b-tab>
                    </b-tabs>
                </b-card>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import Processing from './Processing.vue'

export default {
    name: 'Tratamento de Vendas',
    components: { Processing }
}
</script>

<style>

</style>
