<template>
  <div :style="bgStyle">
    <app-header />
    <router-view @setBackground="initBackground" />
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'

export default {
  emits: ['setBackground'],
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
      console.log(this.$route)
      this.background = background
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
  },
}
</script>
