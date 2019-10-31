<template>
    <div class="content">
        <Reset v-if="!employeerUpdated" />
        <Stats v-else />
    </div>
</template>

<script>
import Stats from './Stats.vue'
import Reset from './ResetPassword.vue'

export default {
    name: 'Dashboard',
    components: { Stats, Reset },
    data() {
        return {
            employeer: null,
            employeerUpdated: null 
        }
    },
    methods: {
        loadEmployeer() {
            this.employeer = this.$store.state.employeer
            if(this.employeer != null) {
                this.employeerUpdated = this.employeer.updated
            }
        }
    },
    mounted() {
        this.loadEmployeer()
    }
}
</script>

<style>

</style>
