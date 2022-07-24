<template>
  <div class="due-date-container flex align-center">
    <h3 class="small-title">Due Date</h3>
    <label class="flex" for="due-date-picker">
      <input
        type="checkbox"
        class="date-checkbox"
        @input="toggleIsDone"
        :checked="task.status === 'done'"
      />
      <button class="due-date-btn"  @click.stop="dateClicked">
        <span class="due-date-txt">{{ dueDateFixed }}</span>
        <span class="task-complete" v-if="task.status === 'done'"
          >complete</span
        >
        <svg
          width="24"
          height="24"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button
        class="flex align-center justify-center remove-duedate-btn"
        @click.stop="removeDueDate"
      >
        <span>Remove</span>
      </button>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    dueDateFixed() {
      if (this.task?.dueDate) {
        var fixedDate = (new Date(this.task.dueDate) + '').slice(4, 10)
        fixedDate += ' at 12:00 AM'
        return fixedDate
      }
    },
  },
  methods: {
    dateClicked(ev) {
      this.$emit('toggleDate', ev)
    },
    removeDueDate() {
      this.$emit('removeDueDate')
    },
    toggleIsDone() {
        this.$emit('toggleIsDone')
    }
  },
  emits: ['toggleDate', 'removeDueDate', 'toggleIsDone'],

}
</script>
<style></style>
