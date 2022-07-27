<template>
  <div
    class="header-hide"
    :style="{
      height: '44px',
      backgroundColor: '#fff',
      position: 'fixed',
      top: 0,
      width: '100%',
    }"
  ></div>
  <section>
    <div
      class="login-page-header flex justify-center align-center"
      :style="{ height: '196px' }"
    >
      <img
        src="../assets/img/trello-logo.png"
        :style="{
          maxHeight: '43px',
          maxWidth: '43px',
          marginInlineEnd: '11px',
        }"
      />
      <h1
        :style="{
          letterSpacing: '0.8px',
          fontSize: '54.5px',
          height: '26px',
          cursor: 'pointer',
        }"
        @click="$router.push('/')"
      >
        Donatello
      </h1>
    </div>
    <div class="form-container">
      <login-form @login="onLogin" @signup="onSignup" />
    </div>
    <div class="right-svg"></div>
    <div class="left-svg"></div>
  </section>
</template>
<script>
import loginForm from '../cmps/login-form.cmp.vue'
export default {
  name: 'loginPage',
  components: { loginForm },
  data() {
    return {}
  },
  created() {
    const { path } = this.$route
    if (path === '/signup') this.isSignIn = false
    this.$emit('setBackground', '#fff')
  },
  methods: {
    async onLogin(credentials) {
      const user = await this.$store.dispatch({ type: 'login', credentials })
      if (user._id) this.$router.push('/board')
    },
    // onLogout() {
    //   this.$store.dispatch({ type: 'logout' })
    // },
    async onSignup(signupInfo) {
      const user = await this.$store.dispatch({ type: 'signup', signupInfo })
      if (user._id) this.$router.push('/board')
    },
  },
}
</script>
<style>
.form-container {
  font-family: inherit;
}
</style>
