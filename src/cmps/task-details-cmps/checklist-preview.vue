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
        <div :style="progressBarStyle" class="checklist-progress-bar-current"></div>
      </div>
    </div>
    <div class="checklist-items-list">
      <div
        v-for="(todo,idx) in checklist.todos"
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
          ref="todo"
          @click="focusOnEl('todo',idx)"
          v-model="todo.title"
          :style="todo.isDone ? { textDecoration: 'line-through' } : ''"
          >
          <div class="actions flex">
            <span class="fa-solid fa-user-plus"></span>
            <span
              @click="removeTodo(todo.id)"
              class="fa-regular fa-trash-can"
            ></span>
          </div>
          </textarea>
        </div>
        <div v-if="editingTodo===todo.id" class="save-todo-container">
          <button class="save-todo-btn" @click="saveTodo(todo)">Save</button>
          <span
            @click="editingTodo=false"
            class="close-btn trellicons trellicons-close-btn"
          ></span>
        </div>
      </div>
    </div>
    
    <button
      class="add-todo-btn card-sidebar-btn"
      v-if="!addingTodo"
      @click="[addingTodo=!addingTodo,editingTodo=false]"
    >
      <span>Add an item</span>
    </button>
    <div v-else class="add-todo-container">
      <textarea ref="newTodo" v-model="newTodo.title"></textarea>
      <button class="save-todo-btn" @click="saveTodo(newTodo)">Add</button>
      <button
        @click="emptyTodo"
        class="close-new-todo-btn"
      >Cancel</button>
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
      editingTodo: null,
      addingTodo: false,
      newTodo: { title: '', isDone: false },
    }
  },
  methods: {
    emptyTodo() {
      this.newTodo = { title: '', isDone: false }
      this.addingTodo = false
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
      this.addingTodo= false
      }
      this.editingTodo = null
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
    focusOnEl(ref,idx=0){
      this.$refs[ref][idx].focus()
      this.editingTodo=this.checklist.todos[idx].id
      this.addingTodo=false
    }
  },
  computed: {
    progressBarStyle(){
      const background=this.doneTodos==='100%' ? '#61bd4f': '#5ba4cf'
      return {width:this.doneTodos,background}
    },
    doneTodos() {
      if (!this.checklistToEdit?.todos?.length) return `0%`
      return Math.floor(
        (this.checklist.todos.reduce(
          (acc, curr) => (acc = curr.isDone ? acc + 1 : acc),
          0
        ) /
          this.checklist.todos.length) *
          100
      )+'%'
    },
  },
}
</script>
