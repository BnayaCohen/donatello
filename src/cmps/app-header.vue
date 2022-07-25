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
        <img class="member-avatar-big" :src="loggedInUser?.imgUrl" :style="{cursor: 'pointer'}"/>
      </section>
    </div>
  </header>
</template>

<script>
// import loginLogout from '../components/login-logout.vue'
export default {
  name: 'appHome',
  data() {
    return {
      loggedInUser: null
    }
  },
  created() {
    this.loggedInUser = this.$store.getters.user
    console.log(this.loggedInUser)
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
  components: {
    // loginLogout,
  },
}
</script>

<style>
</style>
