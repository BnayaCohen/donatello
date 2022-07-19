<template>
    <header class="app-header flex align-center justify-between">
      <div class="logo">
        <h1>Donatello</h1>
      </div>
      <nav class="flex">
        <router-link class="link" to="/">Home</router-link>
        <!-- <router-link class="link" to="/board">Board</router-link> -->
      </nav>
    </header>
</template>
<script>
export default {
  name: 'app-header',
  computed: {
  },
  methods: {
  },
  created() {
  }
}
</script>
