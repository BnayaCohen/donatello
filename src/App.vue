<template>
  <div :style="bgStyle" style="background-position-y: top">
    <app-header @searchBoards="onSearchBoards" @toggleUserMenu="toggleUserMenu" :bgColor="headerColor"
      :isDark="isDarkTheme" @cleanSearch="cleanSearch" @closeSearchModal="cleanSearch" />
    <router-view @setBackground="initBackground" :isDark="isDarkTheme" />
  </div>
  <user-menu v-if="isUserMenu" @toggleUserMenu="isUserMenu = false" v-click-outside="toggleUserMenu"
    @logout="onLogout" />
  <search-modal :filteredBoards="filteredBoards" v-if="isSearch" />
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
import userMenu from '@/cmps/user-menu.vue'
import searchModal from '@/cmps/search-modal.vue'
import { utilService } from '@/services/util-service'

export default {
  name: 'app',
  data() {
    return {
      background: '',
      isUserMenu: false,
      x: 0,
      y: 0,
      isDarkTheme: false,
      headerColor: '',
      filteredBoards: [],
      isSearch: false
    }
  },
  created() {
    this.$store.dispatch('loadBoards')
  },
  methods: {
    async initBackground(background) {
      if (!background) return
      if (background.length > 10) {
        this.headerColor = await utilService.getImgAvgColor(background)
        this.isDarkTheme = await utilService.isDarkImg(background)
        this.background = `url('${background}') no-repeat center center/cover`
      } else {
        this.headerColor = ''
        this.isDarkTheme = utilService.isDarkColor(background)
        this.background = background
      }
    },
    async onSearchBoards(filterBy) {
      this.isSearch = true
      this.filteredBoards = await this.$store.dispatch({
        type: 'searchBoards',
        filterBy,
      })
    },
    cleanSearch() {
      this.isSearch = false
      console.log(this.isSearch)
    },
    toggleUserMenu(ev) {
      this.x = ev?.clientX
      this.y = ev?.clientY
      this.isUserMenu = !this.isUserMenu
    },
    onLogout() {
      this.$store.dispatch('logout')
      this.isUserMenu = false
      this.$router.push('/')
    },
    goToBoard() { }
  },
  computed: {
    bgStyle() {
      return {
        background: this.background,
      }
    },
    board() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    appHeader,
    userMenu,
    searchModal,
  },
}
</script>
