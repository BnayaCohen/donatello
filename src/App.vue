<template>
  <app-header />
  <router-link />
</template>

<script >
import { RouterLink, RouterView } from 'vue-router'
import appHeader from '@/cmps/app-header.vue'

export default {
  name: 'app',
  created() {
    // this.$store.dispatch('load')
  },
  components: {
    appHeader
  }
}
</script>