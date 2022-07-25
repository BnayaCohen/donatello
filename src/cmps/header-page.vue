<template style="font-family: trellicons">
  <header class="header-home-page" ref="headRef">
    <div class="header-home-page-container flex">
      <router-link to="/" class="home-page-logo"
        ><img style="width: 136px" src="../assets/img/logo.png" alt=""
      /></router-link>
      <div class="login-container">
        <router-link class="login" to="/login">Log in</router-link>
        <a class="signup" 
          >Get Donatello for free</a
        >
      </div>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    vueOnScroll() {
      const refs = this.$refs.headRef // assign the reference in variable
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) refs.classList.add('page-header-box-shadow')
        else refs.classList.remove('page-header-box-shadow')
      })
    },
  },
  mounted() {
    // run the function when the component's mount
    this.vueOnScroll()
  },
}
</script>
