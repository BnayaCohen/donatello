<template>
  <section class="checklist-preview">
    <span class="trellicons trellicons-checklist"></span>
    <div class="checklist-title">
      <h3>{{ checklist.title }}</h3>
      <button
        @click="$emit('removeChecklist', checklist.id)"
        class="remove-checklist"
      >
        Delete
      </button>
    </div>
    <div class="checklist-progress">
      <span class="progressbar-percentage">{{ doneTodos }}</span>
      <div class="checklist-progress-bar">
        <div width="doneTodos" class="checklist-progress-bar-current"></div>
      </div>
    </div>
    <div class="checklist-items-list">
      <div
        v-for="todo in checklist.todos"
        :key="todo.id"
        class="checklist-item"
      >
        <input
          @change="toggleIsDone(todo)"
          v-model="todo.isDone"
          type="checkbox"
        />
        <div class="checklist-item-text">
          <textarea
            v-model="todo.title"
            :style="todo.isDone ? { textDecoration: 'line-through' } : ''"
          ></textarea>
          <div class="actions">
            <span class="fa-solid fa-user-plus"></span>
            <span
              @click="removeTodo(todo.id)"
              class="fa-regular fa-trash-can"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <button
      class="add-todo-btn card-sidebar-btn"
      v-if="!editingTodo"
      @click="editingTodo = !editingTodo"
    >
      <span>Add an item</span>
    </button>
    <div v-else class="add-todo-container">
      <textarea v-model="newTodo.title"></textarea>
      <button class="save-todo-btn" @click="saveTodo(newTodo)">Add</button>
      <span
        @click="emptyTodo"
        class="close-btn trellicons trellicons-close-btn"
      ></span>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../services/util-service'
export default {
  props: { checklist: Object },
  mounted() {},
  data() {
    return {
      checklistToEdit: this.checklist,
      editingTodo: false,
      newTodo: { title: '', isDone: false },
    }
  },
  methods: {
    emptyTodo() {
      this.newTodo = { title: '', isDone: false }
      this.editingTodo = false
    },
    saveTodo(todo) {
      if (!todo.title) return
      const idx = this.checklistToEdit.todos.findIndex(
        (curTodo) => curTodo.id === todo.id
      )
      if (idx !== -1) this.checklistToEdit.todos.splice(idx, 1, todo)
      else {
        todo.id = utilService.makeId()
        this.checklistToEdit.todos.push(todo)
        this.newTodo = { title: '', isDone: false }
      }
      this.editingTodo = false
      this.save()
    },
    removeTodo(todoId) {
      const idx = this.checklistToEdit.todos.findIndex(
        (todo) => todo.id === todoId
      )
      if (idx !== -1) this.checklistToEdit.todos.splice(idx, 1)
      this.save()
    },
    toggleIsDone(todo) {
      const idx = this.checklistToEdit.todos.findIndex(
        (curTodo) => todo.id === curTodo.id
      )
      if (idx !== -1) this.checklistToEdit.todos.splice(idx, 1, todo)
      this.save()
    },
    save() {
      this.$emit('saveChecklist', this.checklistToEdit)
    },
  },
  computed: {
    doneTodos() {
      if (!this.checklistToEdit?.todos?.length) return `0%`
      return Math.floor(
        (this.checklist.todos.reduce(
          (acc, curr) => (acc = curr.isDone ? acc + 1 : acc),
          0
        ) /
          this.checklist.todos.length) *
          100
      )
    },
  },
}
</script>
