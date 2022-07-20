<template>
  <article class="group-container flex flex-column">
    <div class="group-header flex justify-between">
      <input
        class="clean-input"
        type="text"
        v-model="groupTitle"
        placeholder="Enter group title..."
      />
      <button class="group-options-btn">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>

    <task-list :tasks="group.tasks" />

    <button @click="addTask" class="add-card-btn flex align-center">
      <i class="plus-sign"
        ><svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          t="1551322312294"
          viewBox="0 0 1024 1024"
          version="1.1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs></defs>
          <path
            d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
          ></path>
          <path
            d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
          ></path>
        </svg>
      </i>
      Add a card
    </button>
  </article>
</template>

<script>
import taskList from '../cmps/task-list.vue'
export default {
  name: 'group-preview',
  props: {
    group: {
      group: Object,
    },
  },
  data() {
    return {
      groupTitle: this.group.title,
    }
  },
  methods: {
    addTask() {
      const task = boardService.getEmptyTask()
      task.groupId = group.id
    },
  },
  components: {
    taskList,
  },
}
</script>
