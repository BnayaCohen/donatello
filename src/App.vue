<template>
  <div :style="bgStyle">
    <app-header @toggleUserMenu="toggleUserMenu"/>
    <router-view @setBackground="initBackground" />
  </div>
  <user-menu
    v-if="isUserMenuOpen"
    @toggleUserMenu="toggleUserMenu"
    v-click-outside="toggleUserMenu"
    :pos="getCords"
  />
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
import userMenu from '@/cmps/user-menu.vue'

export default {
  emits: ['setBackground'],
  name: 'app',
  data() {
    return {
      background: '',
      isUserMenuOpen: false,
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
      this.isUserMenuOpen = !this.isUserMenuOpen
    },
  },
  computed: {
    bgStyle() {
      return {
        background: this.background,
      }
    },
    getCords() {
      return { top: this.y + 30 + 'px', left: this.x - 278 + 'px' }
    },
  },
  components: {
    appHeader,
    userMenu
  },
}
</script>
