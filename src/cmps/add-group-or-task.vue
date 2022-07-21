<template>
  <article class="open-title-input" :class="addingGroup">
    <span
      v-if="!isEditingTitle && !edit"
      @click="isEditingTitle = true"
      class="add-entity-placeholder flex"
    >
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
          ></path></svg
      ></i>
      {{ openInputPlaceholder }}
    </span>
    <div v-else class="flex flex-column">
      <textarea
        class="new-title-input"
        type="text"
        :placeholder="inputPlaceholder"
        v-model="titleInput"
        v-focus
      ></textarea>
      <div class="flex align-center">
        <button @click="addEntity" class="add-entity-btn">
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
      isEditingTitle: false,
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
      this.$store.dispatch({ type: 'saveGroup', group: newGroup })
      this.titleInput = ''
    },
    addTask() {
      if (this.titleInput === '') return
      const newTask = boardService.getEmptyTask()
      newTask.title = this.titleInput
      newTask.groupId = this.groupId
      this.$store.dispatch({
        type: 'saveTask',
        groupId: this.groupId,
        task: newTask,
        activity: {
          id: 'a101',
      txt: 'Changed Color',
      createdAt: Date.now(),
      byMember: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      task: {
        id: 'c101',
        title: 'Replace Logo',
      },
        },
      })
      this.titleInput = ''
    },
    closeAddEntity() {
      this.titleInput = ''
      this.isEditingTitle = false
      this.$emit('closeAddEntity')
    },
  },
  computed: {
    addingGroup() {
      return { adding: this.isEditingTitle }
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
