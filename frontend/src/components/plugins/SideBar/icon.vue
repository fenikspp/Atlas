<template>
    <md-avatar>
        <Gravatar :email="employeer.userName"/>
    </md-avatar>
</template>

<script>
import Gravatar from 'vue-gravatar'
import { mapState } from 'vuex'


export default {
    name: 'icon',
    components: { Gravatar },
    computed: mapState(['employeer'])
}
</script>

<style>

</style>
