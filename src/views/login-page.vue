<template>
  <section>
    <div class="form-container">
      <login-form @login="onLogin"/>
    </div>
    <div class="right-svg">
      <img src="/static/media/login-svg-right.df08073f.svg" alt="right-svg" />
    </div>
    <div class="left-svg">
      <img src="/static/media/login-svg-left.ff7c7688.svg" alt="left-svg" />
    </div>
  </section>
</template>
<script>
import loginForm from '../cmps/login-form.cmp.vue'
export default {
  name: 'loginPage',
  components: { loginForm },
  methods: {
    onLogin(credentials) {
      this.$store.dispatch({ type: 'login', credentials })
    },
    // onLogout() {
    //   this.$store.dispatch({ type: 'logout' })
    // },
    // onSignup(signupInfo) {
    //   this.$store.dispatch({ type: 'signup', signupInfo })
    // },
  },
}
</script>
<style>
.form-container {
}

</style>
