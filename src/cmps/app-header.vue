<template>
  <header class="app-header flex">
    <section class="nav-container">
      <nav class="main-nav flex">
        <router-link to="/">Home</router-link>
        <router-link to="/board">Boards</router-link>
      </nav>
    </section>
    <section class="logo flex">
      <h1>Donatello</h1>
    </section>
    <section class="user-actions">
        <button>+</button>
        <!-- REPLACE WITH RELEVANT CMPS (login-logout, notification) -->
        <button>Noti</button> 
        <button>User</button>
    </section>
  </header>
</template>

<script>
// import loginLogout from '../components/login-logout.vue'
export default {
  name: 'appHome',
  data() {
    return {}
  },
  methods: {
    login(credentials) {
      this.$emit('login', credentials)
    },
    logout() {
      this.$emit('logout')
    },
    signup(signupInfo) {
      this.$emit('signup', signupInfo)
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  components: {
    // loginLogout,
  },
}
</script>

<style></style>
