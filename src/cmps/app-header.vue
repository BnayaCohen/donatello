<template>
  <header class="main-layout app-header">
    <div class="flex justify-between align-center">
      <section class="nav-container">
        <div class="logo flex">
          <router-link to="/">Donatello</router-link>
        </div>
      </section>
      <section class="user-actions">
        <!-- REPLACE WITH RELEVANT CMPS (login-logout, notification) -->
        <button>Noti</button>
        <button>User</button>
      </section>
    </div>
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
    },
  },
  components: {
    // loginLogout,
  },
}
</script>

<style></style>
