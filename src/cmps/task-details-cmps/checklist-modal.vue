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
import { utilService } from '../../services/util-service'

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
      const checklist = {
        id: utilService.makeId(),
        todos: [],
        title: this.title,
      }
      this.$emit('addChecklist', checklist)
      this.title = ''
      this.$emit('toggle', { ev: '', type: 'Checklist' })
    },
  },
  props: { pos: Object },
  emits: ['toggle', 'addChecklist'],
}
</script>
