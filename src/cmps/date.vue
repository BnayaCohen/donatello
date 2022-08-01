<template>
  <div class="dynamic-popover pos-fixed due-date-picker" :style="pos">
    <div class="popover-header flex justify-center align-center">
      <span>Dates</span>
      <button class="pop-close-btn" @click.stop="$emit('modalClosed')">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>

    <datepicker inline class="due-date-picker" id="due-date-picker" :value="dueDate" v-model="dueDate"
      @update:modelValue="dueDate"></datepicker>
    <div class="pop-content">
      <button class="full-btn flex align-center justify-center save-duedate-btn" @click.stop="updateDueDate">
        <span>Save</span>
      </button>
      <button class="full-btn flex align-center justify-center remove-duedate-btn" @click.stop="removeDueDate">
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs3-datepicker'
import { ref } from 'vue';
export default {
  props: {
    pos: Object
  },
  data() {
    return {
      dueDate: ref(new Date())
    }
  },
  methods: {
    updateDueDate() {
      this.$emit('updateDueDate', this.dueDate)
    },
    removeDueDate() {
      this.$emit('removeDueDate')
      this.$emit('modalClosed')
    }
  },
  components: { Datepicker },
  emits: ['updateDueDate', 'removeDueDate', 'modalClosed', 'toggleDate']
}
</script>