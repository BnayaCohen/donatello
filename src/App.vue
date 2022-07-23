<template>
  <div :style="bgStyle">
    <app-header />
    <router-view @setBackground="initBackground" />
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'

export default {
  name: 'app',
  data() {
    return {
      background: '',
    }
  },
  created() {
    this.$store.dispatch('loadBoards')
  },
  methods: {
    initBackground(background) {
      this.background = background
    }
  },
  computed: {
    bgStyle() {
      return {
        background: this.background
      }
    }
  },
  components: {
    appHeader,
  },
}
</script>
