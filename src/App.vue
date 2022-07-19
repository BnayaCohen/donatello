<template>
  <app-header />
  <router-view />
</template>

<script>
import appHeader from '@/cmps/app-header.vue'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadBoards')
  },
  components: {
    appHeader,
  },
}
</script>
