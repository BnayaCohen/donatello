<template>
  <header-home-page />
  <section class="home-page home-page-layout">
    <div class="hero">
      <div class="hero-description">
        <div class="text-container">
          <h1>
            Donatello helps teams move work forward.
            <span ref="el" data-words='["forward.","together.","better."]'><span class="txt"></span></span>
          </h1>
          <p>
            Collaborate,manage projects and reach new productivity peaks. from
            high rises to the home office,the way your team works is unique
            —accomplish it all with Donatello.
          </p>
          <a class="start-doing" @click="loginAsGuest"><span>Start demo</span></a>
        </div>
      </div>
      <div class="hero-img">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp" />
      </div>
    </div>
    <section class="get-started">
      <h2>It's more than work.It's a way of working together.</h2>
      <p>
        Start with a Trello board, lists, and cards. Customize and expand with
        more features as your teamwork grows. Manage projects, organize tasks,
        and build team spirit—all in one place.
      </p>

    </section>
    <img
      src="https://images.ctfassets.net/rz1oowkt5gyp/7pYWhpQ3vnntxoShaImNws/777fabbf069416489167ab92027ce086/board.png?w=1200&fm=webp" />
  </section>
</template>

<script>
import headerHomePage from '../cmps/header-page.vue'
import { TypeWriter } from '../services/util-service'
export default {
  // mounted() {
  //   const el = this.$refs.el
  //   const words = JSON.parse(el.getAttribute('data-words'))
  //   new TypeWriter(el, words)
  // },
  components: { headerHomePage },
  data() {
    return {
      el: null,
    }
  },
  methods: {
    loginAsGuest() {
      this.$router.push('/board')
    }
  }
}
</script>

<style>
.home-page-layout {
  display: grid;
  grid-template-columns: 10vw 1fr 10vw;
}

.home-page-layout * {
  grid-column: 2;
}
</style>
