<template>
  <header class="main-layout board-header">
    <div class="flex justify-between">
      <section class="board-options flex justify-center">
        <input class="board-name-input" type="text" placeholder="Enter board name here" />
        <button>&#9734;</button>
        <div class="members-container flex align-center">
          <p>(board members)</p>
          <button>Invite</button>
        </div>
      </section>
      <section class="more-options">
        <button>Dashboard</button>
        <button>Show menu</button>
      </section>
    </div>
  </header>
</template>
<script>
export default {
  name: 'boardHeader',
  data() {
    return {}
  },
}
</script>
<style></style>
