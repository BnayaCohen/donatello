<template>
  <header class="main-layout app-header">
    <div class="flex justify-between align-center">
      <section class="nav-container">
        <div class="logo flex">
<button class="btn btn-background" @click="goToHome" style="font-weight: 600;"><i class="fa-brands fa-trello"></i>
Donatello</button>
<button class="btn btn-background" @click="goToBoards">Boards</button>
        </div>
      </section>
      <section class="user-actions flex">
        <!-- REPLACE WITH RELEVANT CMPS (login-logout, notification) -->
        <button class="btn btn-background"><i class="fa-solid fa-bell"></i></button>
        <button class="btn btn-background">Avatar</button>
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
    goToHome() {
      this.$router.push('/')
    },
    goToBoards() {
      this.$router.push('/board')
    }
  },
  computed: {
  },
  components: {
    // loginLogout,
  },
}
</script>

<style>
</style>
