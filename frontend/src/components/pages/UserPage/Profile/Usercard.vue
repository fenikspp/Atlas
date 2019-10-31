<template>
    <div>
        <md-card class="md-card-profile">
            <div class="md-card-avatar">
                <Gravatar :email="employeer.userName"/>
            </div>
            <md-card-content>
                <h6 class="category text-gray">{{userCarge}}</h6>
                <h4 class="card-title">{{employeer.name}}</h4>
                <p class="card-description">
                    Don't be scared of the truth because we need to restart the human
                    foundation in truth And I love you like Kanye loves Kanye I love Rick
                    Owens’ bed design but the back is...
                </p>
                <md-button class="md-round md-success">Follow</md-button>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import Gravatar from 'vue-gravatar'
import { mapState } from 'vuex'

export default {
    name: 'UserCard',
    components: { Gravatar },
    computed: mapState(['employeer']),
    data() {
        return {
            userCarge: ''
        }
    },
    methods: {
        mountedcharge() {
            if (this.$store.state.employeer.type == 'admin') {
                this.userCarge = 'Administrador'
            }
            if (this.$store.state.employeer.type == 'vend') {
                this.userCarge = 'Vendedor'
            }
            if (this.$store.state.employeer.type == 'bko') {
                this.userCarge = 'BackOffice'
            }
        }
    },
    mounted() {
        this.mountedcharge()
    }
}
</script>

<style>

</style>
