<template>
  <div class="pos-absolute due-date-picker" :style="pos">
    <datepicker
      :inline="true"
      class="due-date-picker"
      id="due-date-picker"
      v-model="dueDate"
      :value="dueDate"
      @update:modelValue="updateDueDate"
    ></datepicker>
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
  },
  components: { Datepicker },
}
</script>
<style></style>
