<template>
  <li
    @mouseenter="toggleOnHover"
    @mouseleave="toggleOnHover"
    class="task-preview"
  >
    <div class="flex flex-column">
      <span v-if="onHover" class="hover-edit-btn"
        ><i class="fa-solid fa-pencil"></i
      ></span>
      <div class="task-preview-header">
        <div v-if="task.styles" class="image-wrapper"></div>
      </div>
      <p>{{ task.title }}</p>
    </div>
  </li>
</template>
<script>
export default {
  name: 'taskPreview',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      onHover: false,
    }
  },
  methods: {
    toggleOnHover() {
      this.onHover = !this.onHover
    },
  },
}
</script>
<style></style>
