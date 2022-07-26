<template>
  <div
    class="dynamic-popover pos-absolute checklist-popover-container"
    :style="pos"
  >
    <div class="popover-header flex justify-center align-center">
      <h4 class="modal-title">Add checklist</h4>
      <button class="pop-close-btn">
        <span
          @click="$emit('toggle', { ev: $event, type: 'Checklist' })"
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
      this.$emit('addChecklist', checklist)
      this.title = ''
      this.$emit('toggle', { ev: '', type: 'Checklist' })
    },
  },
  props: { pos: Object },
  emits: ['toggle', 'addChecklist'],
}
</script>
