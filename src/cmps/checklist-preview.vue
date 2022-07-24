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
          <textarea
            :style="todo.isDone ? { textDecoration: 'line-through' } : ''"
            >{{ todo.txt }}</textarea
          >
          <div class="actions">
            <span class="fa-solid fa-user-plus"></span>
            <span @click="removeTodo" class="fa-regular fa-trash-can"></span>
          </div>
        </div>
      </div>
    </div>
    <button
      class="add-todo-btn card-sidebar-btn"
      v-if="!editingTodo"
      @click="focusOnEl"
    >
      <span>Add an item</span>
    </button>
    <div v-else class="add-todo-container">
      <button class="save-todo-btn" @click="saveTodo()">Add</button>
      <span class="close-btn trellicons trellicons-close-btn"></span>
    </div>
  </section>
</template>

<script>
export default {
  props: { checklist: Object },
  data() {
    return {
      checklistToEdit: this.checklistCopy,
      editingTodo: false,
      newTodo: { id: utilService.makeId(), txt: '', isDone: false },
    }
  },
  methods: {
    saveTodo() {
      // if new todo has no txt it means we are editing an existing todo
      if (!this.newTodo.txt) return this.save()
      this.checklistToEdit.todos.push({ ...this.newTodo })
      this.newTodo = { id: utilService.makeId(), txt: '', isDone: false }
      this.editingTodo = !this.editingTodo
      this.save()
    },
    removeTodo(todoId) {
      const idx = this.checklistToEdit.todos.findIndex(
        (todo) => todo.id === todoId
      )
      if (idx !== -1) this.checklistToEdit.splice(idx, 1)
      this.save()
    },
    toggleIsDone(todoId) {
      const todo = this.checklistToEdit.todos.find((todo) => todo.id === todoId)
      todo.isDone = !todo.isDone
      this.save()
    },
    save() {
      this.$emit('saveChecklist', { checklist: this.checklistToEdit })
    },
    focusOnEl() {
      this.$refs.text.focus()
      this.editingTodo = !this.editingTodo
    },
  },
  computed: {
    doneTodos() {
      return Math.floor(
        (this.checklist.todos.reduce(
          acc,
          (curr) => (acc = curr.isDone ? acc + 1 : acc),
          0
        ) /
          this.checklist.todos.length) *
          100
      )
    },
    checklistCopy() {
      return JSON.parse(JSON.stringify(this.checklist))
    },
  },
}
</script>
