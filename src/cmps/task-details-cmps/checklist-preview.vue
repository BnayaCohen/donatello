<template>
  <section class="checklist-preview">
    <!-- Checklist header -->
    <div class="checklist-header flex ">
      <span class="trellicons trellicons-checklist"></span>
      <!-- Regular mode -->
      <div v-if="editing !== checklist.id" style="width:100%;"
        class="checklist-header-title flex align-center justify-between" @click="focusOnEl('checklist')">
        <h3>{{ checklist.title }}</h3>
        <button @click="$emit('removeChecklist', checklist.id)" class="remove-checklist">
          Delete
        </button>
      </div>
      <!-- Editing mode -->
      <div v-else class="save-container">
        <textarea class="edit-textarea bold" v-model="checklistToEdit.title" ref="checklist"></textarea>
        <div class="edit-controls">
          <button class="save-btn" @click=";[editing = null, save()]">Save</button>
          <span @click="editing = null" class="close-btn trellicons trellicons-close-btn"></span>
        </div>
      </div>
    </div>
    <!-- Progressbar -->
    <div class="checklist-progress flex">
      <span class="progressbar-percentage">{{ doneTodos }}</span>
      <div class="checklist-progress-bar self-center">
        <div :style="progressBarStyle" class="checklist-progress-bar-current"></div>
      </div>
    </div>
    <!-- Todos list container -->
    <div class="checklist-items-list">
      <!-- Todo preview -->
      <div v-for="(todo, idx) in checklist.todos" :key="todo.id" class="checklist-item">
        <el-checkbox @change="toggleIsDone(todo)" v-model="todo.isDone" type="checkbox"></el-checkbox>
        <!-- Regular mode -->
        <div v-if="editing !== todo.id" class="checklist-item-text">
          <p @click="focusOnEl('todo', idx)" :style="todo.isDone ? { textDecoration: 'line-through' } : ''">{{
              todo.title
          }}</p>
        </div>
        <!-- Edit mode -->
        <div v-else class="save-container">
          <textarea class="edit-textarea" ref="todo" v-model="todo.title">
            </textarea>
          <div class="edit-controls flex">
            <button class="save-btn" @click="saveTodo(todo)">Save</button>
            <span @click="editing = null" class="close-btn trellicons trellicons-close-btn"></span>
          </div>
        </div>
      </div>
    </div>

    <button class="add-todo-btn card-sidebar-btn" v-if="!addingTodo"
      @click="[addingTodo = !addingTodo, editing = null]">
      <span>Add an item</span>
    </button>
    <div v-else class="add-todo-container">
      <textarea v-model="newTodo.title"></textarea>
      <div class="edit-controls">

        <button class="save-todo-btn" @click="saveTodo(newTodo)">Add</button>
        <button @click="emptyTodo" class="close-new-todo-btn">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../services/util-service'
export default {
  props: { checklist: Object },
  mounted() { },
  data() {
    return {
      checklistToEdit: this.checklist,
      editing: null,
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
        this.addingTodo = false
      }
      this.editing = null
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
    focusOnEl(ref, idx = 0) {
      if (ref !== 'todo') {
        this.editing = this.checklist.id
        setTimeout(() => { this.$refs[ref].focus() }, 300)
      }
      else {
        this.editing = this.checklist.todos[idx].id
        setTimeout(() => {
          console.log(this.$refs)
          this.$refs[ref][0].focus()
        }, 300)
      }

      this.addingTodo = false

    }
  },
  computed: {
    progressBarStyle() {
      const background = this.doneTodos === '100%' ? '#61bd4f' : '#5ba4cf'
      return { width: this.doneTodos, background, height: '100%', borderRadius: `4px` }
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
      ) + '%'
    },
  },
}
</script>
<!-- <div class="actions flex">
            <span class="fa-solid fa-user-plus"></span>
            <span
              @click="removeTodo(todo.id)"
              class="fa-regular fa-trash-can"
            ></span>
          </div> -->