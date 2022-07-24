<template>
  <div :style="pos" class="checklist-modal-component">
    <header class="checklist-header">
      <h3>Add checklist</h3>
      <span class="close-btn trellicons trellicons-close-btn"></span>
    </header>
    <section class="checklist-inputs">
      <label>Title</label>
      <input type="text" v-model="title" />
      <button @click="addChecklist" class="add-checklist-btn">Add</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    }
  },
  methods: {
    addChecklist() {
      if (!this.title) return
      $emit('addChecklist', title)
    },
  },
  props: { pos: Object },
}
</script>
