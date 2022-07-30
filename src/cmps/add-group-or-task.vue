<template>
  <article class="open-title-input" :class="addingGroup">
    <span v-if="!isEditingTitle && !edit" @click="$emit('toggleAddEntity')" class="add-entity-placeholder flex">
      <i class="trellicons trellicons-plus-sign"></i>
      {{ openInputPlaceholder }}
    </span>
    <div v-else class="flex flex-column">
      <textarea class="new-title-input" :class="addingGroup" type="text" :placeholder="inputPlaceholder"
        v-model="titleInput" v-focus></textarea>
      <div class="flex align-center">
        <button @click="addEntity" class="add-entity-btn" v-focus>
          {{ btnPlaceholder }}
        </button>
        <button @click="closeAddEntity" class="close-btn trellicons trellicons-close-btn">

        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { boardService } from '../services/board-service.js'
export default {
  name: 'add-group-or-task',
  props: {
    groupOrTask: String,
    groupId: String,
    edit: Boolean,
  },
  data() {
    return {
      titleInput: '',
      isEditingTitle: this.edit,
    }
  },
  methods: {
    addEntity() {
      switch (this.groupOrTask) {
        case 'group':
          this.addGroup()
          break
        case 'task':
          this.addTask()
          break
      }
    },
    addGroup() {
      if (this.titleInput === '') return
      const newGroup = boardService.getEmptyGroup()
      newGroup.title = this.titleInput
      this.$store.dispatch({ type: 'saveGroup', group: newGroup, activityTxt: 'Created list ' + newGroup.title })
      this.titleInput = ''
    },
    async addTask() {
      if (this.titleInput === '') return
      try {
        const newTask = boardService.getEmptyTask()
        newTask.title = this.titleInput
        newTask.groupId = this.groupId
        newTask.byMember = this.$store.getters.user
        const group = this.$store.getters.board.groups.find(g => g.id === this.groupId)
        const board = await this.$store.dispatch({
          type: 'saveTask',
          groupId: this.groupId,
          task: newTask,
          activityTxt: `Added card ${newTask.title} to list ${group.title}`
        })
        this.titleInput = ''
        this.$emit('x', board)
      } catch (err) {

      }
    },
    closeAddEntity() {
      this.titleInput = ''
      this.isEditingTitle = false
      this.$emit('toggleAddEntity')
    },
  },
  computed: {
    addingGroup() {
      return {
        adding: this.isEditingTitle || this.edit,
        task: this.groupOrTask === 'task',
        group: this.groupOrTask === 'group',
      }
    },
    openInputPlaceholder() {
      switch (this.groupOrTask) {
        case 'group':
          return 'Add another list'
        case 'task':
          return 'Add a card'
      }
    },
    inputPlaceholder() {
      switch (this.groupOrTask) {
        case 'group':
          return 'Enter list title...'
        case 'task':
          return 'Enter a title for this card...'
      }
    },
    btnPlaceholder() {
      switch (this.groupOrTask) {
        case 'group':
          return 'Add list'
        case 'task':
          return 'Add card'
      }
    },
  },
}
</script>
