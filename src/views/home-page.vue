<template>
  <header-home-page />
  <div class="home-page">
    <section class="home-page-layout">
      <div class="hero">
        <div class="hero-description">
          <div class="text-container">
            <h1>
              Donatello helps teams move work forward.
              <span ref="el" data-words='["forward.","together.","better."]'
                ><span class="txt"></span
              ></span>
            </h1>
            <p style="lineheight: 35px">
              Collaborate,manage projects and reach new productivity peaks. from
              high rises to the home office,the way your team works is unique
              —accomplish it all with Donatello.
            </p>
            <a class="start-doing flex justify-center" @click="loginAsGuest"
              ><span>Start demo</span></a
            >
          </div>
        </div>
        <div class="hero-img">
          <img
            src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"
          />
        </div>
      </div>
      <section class="get-started">
        <h2>It's more than work. It's a way of working together.</h2>
        <p>
          Start with a Donatello board, lists, and cards. Customize and expand
          with more features as your teamwork grows. Manage projects, organize
          tasks, and build team spirit—all in one place.
        </p>
      </section>
      <div class="hide-rect"></div>
      <img src="../assets/img/demo-app-img.png" />
    </section>
  </div>
</template>

<script>
import headerHomePage from '../cmps/header-page.vue'
import { userService } from '../services/user-service'
export default {
  components: { headerHomePage },
  data() {
    return {
      el: null,
    }
  },
  methods: {
    loginAsGuest() {
      const user = userService.getLoggedInUser()
      this.$store.commit({ type: 'setUser', user })
      this.$router.push('/board')
    },
  },
  created() {
    this.$emit('setBackground', '')
  },
}
</script>