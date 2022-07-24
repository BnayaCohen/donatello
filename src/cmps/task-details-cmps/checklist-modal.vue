<template>
  <div :style="pos" class="checklist-modal-component">
    <header class="checklist-header">
      <h3>Add checklist</h3>
      <span
        @click="$emit('toggle', { ev: $event, type: 'Checklist' })"
        class="close-btn trellicons trellicons-close-btn"
      ></span>
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
  created() {},
  data() {
    return {
      title: '',
    }
  },
  methods: {
    addChecklist() {
      if (!this.title) return
      this.$emit('addChecklist', this.title)
      this.title = ''
      this.$emit('toggle', { ev: '', type: 'Checklist' })
    },
  },
  props: { pos: Object },
  emits: ['toggle', 'addChecklist'],
}
</script>
