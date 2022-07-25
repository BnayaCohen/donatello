<template>
  <article v-if="group.title" class="group-container flex flex-column">
    <div class="group-header flex">
      <input class="group-title clean-input" type="text" v-model="group.title" placeholder="Enter list title..."
        @keyup.enter="updateTitle" />

      <button @click="togglePopup" class="group-options-btn trellicons trellicons-options">
        <div v-if="showPopup" v-click-outside="togglePopup" class="popup">
          <h4>List actions</h4>
          <span @click.stop="togglePopup" class="close-popup-btn trellicons trellicons-close-btn"></span>
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
              <span @click="removeGroup">Archive list...</span>
            </li>
            <li>
              <span>Watch</span>
            </li>
          </ul>
        </div>
      </button>
    </div>

    <task-list :groupId="group.id" :tasks="group.tasks" :addTask="addTask" @toggleAddEntity="toggleAddTask" />
    <section v-if="!addTask" class="add-task-container">
      <add-group-or-task @toggleAddEntity="toggleAddTask" :edit="addTask" :groupOrTask="'task'"
        :groupId="group.id" />
    </section>
  </article>
  <section v-else class="new-group-container">
    <section class="add-group-container">
      <add-group-or-task :groupOrTask="'group'" @toggleAddEntity="toggleAddTask" :edit="addTask" />
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
    x(board){
      this.$emit('x', board)
    },
    updateTitle() {
      if (this.group.title === '') return
      this.$store.dispatch({ type: 'saveGroup', group: this.group })
    },
    setAddTaskTrue() {
      this.addTask = true
    },
    toggleAddTask() {
      this.addTask = !this.addTask
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    removeGroup() {
      this.$store.dispatch({ type: 'removeGroup', groupId: this.group.id })
    },
  },
  components: {
    taskList,
    addGroupOrTask,
  },
}
</script>
