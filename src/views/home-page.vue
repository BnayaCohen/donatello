<template>
  <header-home-page />
  <section class="home-page home-page-layout">
    <div class="hero">
      <div class="hero-description">
        <h1>Donatello helps teams move work forward.</h1>
        <p>
          Collaborate,manage projects and reach new productivity peaks. from
          high rises to the home office,the way your team works is unique
          —accomplish it all with Donatello.
        </p>
      </div>
      <div class="hero-img">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"
        />
      </div>
    </div>
    <section class="get-started">
      <h2>It's more than work.It's a way of working together.</h2>
      <p>
        Start with a Trello board, lists, and cards. Customize and expand with
        more features as your teamwork grows. Manage projects, organize tasks,
        and build team spirit—all in one place.
      </p>
      <router-link to="/board">Start doing</router-link>
    </section>
    <img
      src="https://images.ctfassets.net/rz1oowkt5gyp/7pYWhpQ3vnntxoShaImNws/777fabbf069416489167ab92027ce086/board.png?w=1200&fm=webp"
    />
  </section>
</template>

<script>
import headerHomePage from '../cmps/header-page.vue';
export default {
  components: { headerHomePage },
};
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
