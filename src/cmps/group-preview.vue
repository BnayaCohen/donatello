<template>
  <article v-if="group.title" class="group-container flex flex-column">
    <div class="group-header flex">
      <input
        class="group-title clean-input"
        type="text"
        v-model="group.title"
        placeholder="Enter list title..."
        @keyup.enter="updateTitle"
      />

      <button @click="togglePopup" class="group-options-btn">
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
        <div v-if="showPopup" class="popup">
          <h4>List actions</h4>
          <span @click.stop="togglePopup" class="close-popup-btn"
            ><svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="xmark"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="svg-inline--fa fa-xmark fa-xl"
            >
              <path
                fill="currentColor"
                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                class=""
              ></path></svg
          ></span>
          <ul class="popup-list clean-list">
            <li>
              <span @click="setAddTaskTrue">Add card...</span>
            </li>
            <li>
              <span>Copy list...</span>
            </li>
            <li>
              <span>Move list...</span>
            </li>
            <li>
              <span>Archive list...</span>
            </li>
            <li>
              <span>Watch</span>
            </li>
          </ul>
        </div>
      </button>
    </div>

    <task-list :groupId="group.id" :tasks="group.tasks" />
    <section class="add-task-container">
      <add-group-or-task
        @closeAddEntity="setAddTaskFalse"
        :edit="addTask"
        :groupOrTask="status || 'task'"
        :groupId="group.id"
      />
    </section>
  </article>
  <section v-else class="new-group-container">
    <section class="add-group-container">
      <add-group-or-task :groupOrTask="'group'" />
    </section>
  </section>
</template>

<script>
import taskList from '../cmps/task-list.vue'
import addGroupOrTask from '../cmps/add-group-or-task.vue'

export default {
  name: 'group-preview',
  props: {
    group: Object,
  },
  data() {
    return {
      showPopup: false,
      addTask: false,
      status: '',
    }
  },
  methods: {
    updateTitle() {
      if (this.group.title === '') return
      this.$store.dispatch({ type: 'saveGroup', group: this.group })
    },
    setAddTaskTrue() {
      this.addTask = true
      this.status = 'task'
      this.status = ''
    },
    setAddTaskFalse() {
      this.addTask = false
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
  },
  computed: {},
  components: {
    taskList,
    addGroupOrTask,
  },
}
</script>
