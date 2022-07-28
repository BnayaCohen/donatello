<template>
  <div class="main-search-container">
    <input type="text" placeholder="Search for boards.." @input="setFilter" v-model="filterBy.txt">
  </div>
</template>
<script>
    import {utilService} from '../services/util-service.js'
export default {
  data() {
    return {
      filterBy: {
        txt: ''
      },
    }
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000)
  },
  methods: {
    setFilter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
    },
  },
}
</script>
<style></style>
