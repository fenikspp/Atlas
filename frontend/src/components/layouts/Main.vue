<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <!--<notifications></notifications> -->

    <side-bar>
      <Menu slot="content"></Menu>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <Header ></Header>
      <Content ></Content>
      <Footer ></Footer>
      <!--<content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import Header from './Header.vue'
import Menu from './Menu.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'
import { baseApiUrl, employeerKey } from '../../config/js/Global'
import { mapState } from 'vuex'
import axios from 'axios'


export default {
    name: 'App',    
    components: { Header, Menu, Content, Footer },
    computed: mapState(['employeer']),
    data() {
        return {
            validatingToken: true
        }
    },
    methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(employeerKey)
      const employeerData = JSON.parse(json)
      this.$store.commit('setEmployeer', null)

      if(!employeerData) {
        this.validatingToken = false
        this.$router.push({ name: 'Auth' })
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, employeerData)

      if (res.data) {
        this.$store.commit('setEmployeer', employeerData)
        
        if(this.$mq === 'xs' || this.$mq === 'sm') {
          this.$store.commit('toggleMenu', false)
        }
      } else {
        localStorage.removeItem(employeerKey)
        this.$router.push({ name: 'Auth' })
      }

      this.validatingToken = false
    }
    },
    created() {
    this.validateToken()
  }
}

</script>
