<template>
  <div class="dynamic-popover">
    <div class="popover-header flex justify-center align-center">
      <h4>Labels</h4>
      <button class="pop-close-btn" @click.stop="$emit('modalClosed')">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content label-list-container">
      <div class="search-labels">
        <input class="basic-input" type="text" placeholder="Search labels..." />
      </div>
      <h3 class="small-title">Labels</h3>
      <ul class="clean-list">
        <li v-for="label in labels" :key="label.id" @click.stop="toggleLabel(label.id)" class="label flex align-center">
          <div :style="{
            borderRadius: '3px',
            width: '100%',
            height: '32px',
            backgroundColor: label.color,
          }">
            <span v-if="isLabelInUse(label.id)" class="trellicons trellicons-v-check" :style="{
              float: 'right',
              color: '#fff',
              margin: '7px 7px 0 0',
              fontWeight: '400',
            }"></span>
          </div>
          <span class="pos-absolute">{{ label.title }}</span>
        </li>
        <div class="label-create">
          <button class="full-btn">Create a new label</button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    labelIds: Array,
  },
  data() {
    return {
      labels: this.$store.getters.getLabels,
    }
  },
  methods: {
    isLabelInUse(labelId) {
      return this.labelIds.includes(labelId)
    },
    toggleLabel(labelId) {
      this.$emit('taskUpdated', labelId)
    },
  },
  emits: ['taskUpdated', 'modalClosed'],
}
</script>