<template>
<<<<<<< HEAD
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
=======
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
>>>>>>> a81e80bfe2729ea2380c3b134c83144898d4b807
