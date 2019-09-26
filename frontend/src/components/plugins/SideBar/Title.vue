<template>
    <div>
        <span class="md-title">{{ employeer.name }}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
    name: 'title',
    computed: mapState(['employeer'])
}
</script>

<style>

</style>
