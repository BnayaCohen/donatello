<template>
  <header class="main-layout app-header" :style="{background:bgColor}" >
    <div class="flex justify-between align-center" >
      <section class="nav-container">
        <div class="logo flex">
          <button class="btn btn-background" @click="goToHome" style="font-weight: 600;" :class="{'dark-theme':isDark}"><i
              class="fa-brands fa-trello"></i>
            Donatello</button>
          <button class="btn btn-background" :class="{'dark-theme':isDark}" @click="goToBoards">Boards</button>
        </div>
      </section>
      <section class="user-actions flex">
        <!-- REPLACE WITH RELEVANT CMPS (login-logout, notification) -->
        <button class="btn btn-background" :class="{'dark-theme':isDark}"><i class="fa-solid fa-bell"></i></button>
        <img @click="$emit('toggleUserMenu', $event)" class="member-avatar-big" :src="user?.imgUrl"
          :style="{ cursor: 'pointer' }" />
      </section>
    </div>
  </header>
</template>

<script>
// import loginLogout from '../components/login-logout.vue'
export default {
  name: 'appHome',
  props: {
    bgColor: String,
    isDark: Boolean
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    login(credentials) {
      this.$emit('login', credentials)
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
