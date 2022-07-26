<template>
  <div class="dynamic-popover pos-absolute due-date-picker" :style="pos">
    <div class="popover-header flex justify-center align-center">
      <span>Date</span>
      <button class="pop-close-btn" @click.stop="$emit('toggleDate', $event)">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>

    <datepicker
      inline
      class="due-date-picker"
      id="due-date-picker"
      v-model="dueDate"
      :value="dueDate"
      @update:modelValue="updateDueDate"
    ></datepicker>
    <div class="pop-content">
      <button
        class="full-btn flex align-center justify-center save-duedate-btn"
        @click.stop="$emit('toggleDate', $event)"
      >
        <span>Save</span>
      </button>
      <button
        class="full-btn flex align-center justify-center remove-duedate-btn"
        @click.stop="removeDueDate"
      >
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs3-datepicker'

export default {
  props: {
    pos: Object,
    dueDate: Date,
  },

  methods: {
    updateDueDate() {
      this.$emit('updateDueDate', this.dueDate)
    },
    removeDueDate() {
      this.$emit('removeDueDate')
      this.$emit('toggleDate')
    }
  },
  components: { Datepicker },
  emits: ['updateDueDate', 'removeDueDate', 'toggleDate']
}
</script>
<style></style>
