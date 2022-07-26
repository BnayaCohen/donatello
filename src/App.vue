<template>
  <div :style="bgStyle" style="background-position-y: top;">
    <app-header @toggleUserMenu="toggleUserMenu" :bgColor="headerColor" :isDark="isDarkTheme" />
    <router-view @setBackground="initBackground" :isDark="isDarkTheme" />
  </div>
  <user-menu v-if="isUserMenuOpen" @toggleUserMenu="toggleUserMenu" v-click-outside="toggleUserMenu" @logout="logout" />
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
import userMenu from '@/cmps/user-menu.vue'
import { utilService } from '@/services/util-service';

export default {
  name: 'app',
  data() {
    return {
      background: '',
      isUserMenu: false,
      x: 0,
      y: 0,
      isDarkTheme:false,
      headerColor:'',
    }
  },
  created() {
    this.$store.dispatch('loadBoards')
  },
  methods: {
    async initBackground(background) {
      if (background.length > 10) {
        this.headerColor = await utilService.getImgAvgColor(background)
        this.isDarkTheme = await utilService.isDarkImg(background)
        this.background = `url('${background}') no-repeat center center/cover`
      } else {
        this.isDarkTheme = utilService.isDarkColor(background)
        this.background = background
      }
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
        background: this.background
      }
    },
  },
  components: {
    appHeader,
    userMenu,
  },
}
</script>
