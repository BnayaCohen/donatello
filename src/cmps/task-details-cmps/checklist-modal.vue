<template>
  <div
    class="dynamic-popover checklist-popover-container"
  >
    <div class="popover-header flex justify-center align-center">
      <h4 class="modal-title">Add checklist</h4>
      <button class="pop-close-btn">
        <span
          @click="$emit('modalClosed')"
          class="close-btn trellicons trellicons-close-btn"
        ></span>
      </button>
    </div>
    <div class="popover-content">
      <section class="checklist-inputs">
        <h3 class="small-title">Title</h3>
        <input type="text" v-model="title" />
        <button @click="addChecklist" class="add-checklist-btn">Add</button>
      </section>
    </div>
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
      this.$emit('taskUpdated', checklist)
      this.title = ''
      this.$emit('modalClosed')
    },
  },
  emits: ['modalClosed', 'taskUpdated'],
}
</script>
