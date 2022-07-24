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
        <input @change="toggleIsDone" v-model="todo.isDone" type="checkbox" />
        <div class="checklist-item-text">
          <input
            type="text"
            @input="saveTodo"
            v-model="todo.title"
            :style="todo.isDone ? { textDecoration: 'line-through' } : ''"
          />
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
      <input type="text" v-model="newTodo" />
      <button class="save-todo-btn" @click="saveTodo(newTodo)">Add</button>
      <span class="close-btn trellicons trellicons-close-btn"></span>
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
    saveTodo(todo) {
      if (!todo.title) return
      const idx = this.checklistToEdit.todos.findIndex(
        (curTodo) => curTodo.id === todo.id
      )
      if (idx !== -1) this.checklistToEdit.todos.splice(idx, 1, todo)
      else this.checklistToEdit.todos.push(todo)
      this.save()
    },
    removeTodo(todoId) {
      const idx = this.checklistToEdit.todos.findIndex(
        (todo) => todo.id === todoId
      )
      if (idx !== -1) this.checklistToEdit.todos.splice(idx, 1)
      this.save()
    },
    toggleIsDone(todoId) {
      console.log(todoId)
      const todo = this.checklistToEdit.todos.find((todo) => todo.id === todoId)
      todo.isDone = !todo.isDone
      this.save()
    },
    save() {
      this.$emit('saveChecklist', { checklist: this.checklistToEdit })
    },
  },
  computed: {
    doneTodos() {
      if (!this.checklistToEdit.todos.length) return `0%`
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
