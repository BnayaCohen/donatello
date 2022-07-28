<template>
  <header class="main-layout app-header" :style="{ background: bgColor }">
    <div class="flex justify-between align-center">
      <section class="nav-container">
        <div class="logo-side flex">
          <button
            class="logo btn btn-background"
            @click="goToHome"
            :class="{ 'dark-theme': isDark }"
          >
            <i class="fa-brands fa-trello"></i>
            Donatello
          </button>
          <button
            class="btn btn-background"
            :class="{ 'dark-theme': isDark }"
            @click="goToBoards"
          >
            Boards
          </button>
        </div>
      </section>
      <section class="user-actions flex">
        <board-filter @filtered="setFilter" />
        <button class="btn btn-background" :class="{ 'dark-theme': isDark }">
          <i class="fa-solid fa-bell"></i>
        </button>
        <avatar-preview
          @click="$emit('toggleUserMenu', $event)"
          :member="user"
          :avatarSize="'big'"
          :style="{ cursor: 'pointer' }"
        />
      </section>
    </div>
  </header>
</template>

<script>
import avatarPreview from './avatar-preview.vue'
import boardFilter from './board-filter.vue'
export default {
  name: 'appHome',
  props: {
    bgColor: String,
    isDark: Boolean,
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToBoards() {
      this.$router.push('/board')
    },
    setFilter(filterBy) {
      this.$emit('filtered', filterBy)
    },
  },
  components: {
    boardFilter,
    avatarPreview,
  },
}
</script>

<style></style>
