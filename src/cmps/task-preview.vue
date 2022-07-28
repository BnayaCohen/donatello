<template>
  <div class="task-preview" @mouseenter="toggleOnHover" @mouseleave="toggleOnHover"
    @click.stop="openTask(task.groupId, task.id)" :style="{ backgroundColor: onHover ? '#f8f8f8' : '' }">
    <div class="flex flex-column">
      <span v-if="onHover" @click.stop="openQuickEdit" class="hover-edit-btn"><i
          class="trellicons trellicons-edit"></i></span>
      <div v-if="task.style?.background" class="task-preview-header" :style="task.style">
        <img class="task-img-cover" :src="task.style.background" alt="" />
      </div>
      <task-label-list v-if="task.labelIds?.length" :labelIds="task.labelIds" />
      <p>{{ task.title }}</p>

      <section class="task-indicators-container">
        <div class="flex">
          <div v-if="task.dueDate" class="task-due-date" @mouseenter="toggleDueDateOnHover"
            @mouseleave="toggleDueDateOnHover" @click.stop="toggleDueDateCheck" :style="dueDateStyle">
            <div class="due-date-icon">
              <i class="trellicons" :class="'trellicons-' + getDueDateIconName"></i>
            </div>
            <p>{{ getFixedDueDate }}</p>
          </div>

          <section class="task-indicators">
            <span v-if="task.description" class="task-indicator trellicons trellicons-description"></span>
            <div v-if="task.comments?.length" class="task-indicator">
              <span class="trellicons trellicons-comment"></span>
              <p>{{ task.comments.length }}</p>
            </div>
            <div v-if="task.attachments?.length" class="task-indicator">
              <span class="trellicons trellicons-attachment"></span>
              <p>{{ task.attachments.length }}</p>
            </div>
            <div v-if="task.checklists?.length" class="task-indicator">
              <span class="trellicons trellicons-checkedbox"></span>
              <p>{{ getChecklistProgress }}</p>
            </div>
          </section>
        </div>
        <div style="margin-left: auto;">
          <section v-if="task.memberIds?.length" class="task-members-container">
            <avatar-preview v-for="memberId in task.memberIds" :key="memberId" :member="getMemberById(memberId)"
              :avatarSize="'small'" />
          </section>
        </div>
      </section>
    </div>
  </div>
  <quick-edit v-if="isOpen" @closeQuickEdit="closeQuickEdit" @saveTask="saveTask" :getCords="getCords" :task="task" />
</template>
<script>
import taskLabelList from './task-label-list.vue'
import avatarPreview from './avatar-preview.vue'
import quickEdit from './quick-edit.vue'
export default {
  name: 'taskPreview',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      onHover: false,
      onDueDateHover: false,
      isOpen: false,
      x: 0,
      y: 0,
    }
  },
  methods: {
    toggleOnHover() {
      this.onHover = !this.onHover
    },
    toggleDueDateOnHover() {
      this.onDueDateHover = !this.onDueDateHover
    },
    toggleDueDateCheck() {
      const newStatus =
        this.task.status === 'in-progress' ? 'done' : 'in-progress'
      const savedTask = this.task
      savedTask.status = newStatus
      this.saveTask(savedTask)
    },
    openQuickEdit(ev) {
      this.x = ev.clientX
      this.y = ev.clientY
      this.isOpen = true
    },
    closeQuickEdit() {
      this.isOpen = false
    },
    openTask(groupId, taskId) {
      console.log(this.task.style)
      this.closeQuickEdit()
      this.$router.push(
        this.$router.currentRoute._value.path + `/${groupId}/${taskId}`
      )
    },
    getMemberById(memberId) {
      const members = this.$store.getters.getMembers
      return members.find((member) => member._id === memberId)
    },
    saveTask(task) {
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(task)),
        groupId: this.task.groupId,
      })
    },
  },
  computed: {
    getCords() {
      return { top: this.y + 'px', left: this.x - 228 + 'px' }
    },
    getFixedDueDate() {
      return (new Date(this.task.dueDate) + '').slice(4, 10)
    },
    dueDateStyle() {
      return {
        backgroundColor:
          this.task.status === 'in-progress'
            ? Date.now() - this.task.dueDate > 0
              ? this.onDueDateHover
                ? '#eb5a46'
                : '#ec9488'
              : this.onDueDateHover
                ? '#00000014'
                : '#00000000'
            : this.onDueDateHover
              ? '#519839'
              : '#61bd4f',
        color:
          Date.now() - this.task.dueDate > 0 ||
            this.task.status !== 'in-progress'
            ? '#fff'
            : '#5e6c84',
      }
    },
    getDueDateIconName() {
      const currCheckbox =
        this.task.status === 'in-progress' ? 'un-checkedbox' : 'checkedbox'
      return this.onDueDateHover ? currCheckbox : 'clock'
    },
    getChecklistProgress() {
      const checklistCounter = this.task.checklists.reduce(
        (acc, checklist) => {
          acc.overallTodos += checklist.todos?.length
          acc.doneTodos += checklist.todos?.reduce((acc, todo) => {
            if (todo?.isDone) acc++
            return acc
          }, 0)
          return acc
        },
        { doneTodos: 0, overallTodos: 0 }
      )
      return checklistCounter.doneTodos + '/' + checklistCounter.overallTodos
    },
  },
  emits: ['click'],
  components: {
    taskLabelList,
    avatarPreview,
    quickEdit
  },
}
</script>
<style>
</style>
