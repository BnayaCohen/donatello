<template>
  <div v-click-outside="toggleModal" class="checklist-modal-component">
    <header class="checklist-header">
      <h3>Add checklist</h3>
      <span class="close-btn trellicons trellicons-close-btn"></span>
    </header>
    <section class="checklist-inputs">
      <label>Title</label>
      <input class="basic-input" type="text" v-model="title" />
      <button class="add-checklist-btn">Add</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      title: '',
    }
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped></style>
