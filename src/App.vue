<template>
  <div :style="bgStyle" style="background-position-y: top;">
    <app-header @toggleUserMenu="toggleUserMenu" />
    <router-view @setBackground="initBackground" />
  </div>
  <user-menu
    v-if="isUserMenu"
    @toggleUserMenu="toggleUserMenu"
    v-click-outside="toggleUserMenu"
    @logout="logout"
  />
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
import userMenu from '@/cmps/user-menu.vue'

export default {
  name: 'app',
  data() {
    return {
      background: '',
      isUserMenu: false,
      x: 0,
      y: 0,
    }
  },
  created() {
    this.$store.dispatch('loadBoards')
  },
  methods: {
    initBackground(background) {
      this.background = background
    },
    toggleUserMenu(ev) {
      this.x = ev?.clientX
      this.y = ev?.clientY
      this.isUserMenu = !this.isUserMenu
    },
    logout() {
      this.$store.dispatch('logout')
      this.isUserMenu = false
      this.$router.push('/')
    },
  },
  computed: {
    bgStyle() {
      return {
        background: this.background,
      }
    },
  },
  components: {
    appHeader,
    userMenu,
  },
}
</script>
