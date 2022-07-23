<template>
  <div
    class="task-preview"
    @mouseenter="toggleOnHover"
    @mouseleave="toggleOnHover"
    @click.stop="openTask(task.groupId, task.id)"
  >
    <div class="flex flex-column">
      <span v-if="onHover" @click.stop="openQuickEdit" class="hover-edit-btn"
        ><i class="trellicons trellicons-edit"></i
      ></span>
      <div
        v-if="task.style?.background"
        class="task-preview-header"
        :style="task.style"
      >
      <img class="task-img-cover" :src="task.style.background" alt="">
      </div>
      <task-label-list v-if="task.labelIds?.length" :labelIds="task.labelIds" />
      <p>{{ task.title }}</p>


      <section class="task-indicators-container">
        <div class="flex" style="height:em(28px)">
<div v-if="task.dueDate" class="task-due-date"
@mouseenter="toggleDueDateOnHover"
@mouseleave="toggleDueDateOnHover"
@click.stop="toggleDueDateCheck"
:style="dueDateStyle">
<div class="due-date-icon">
  <i class="trellicons" :class="'trellicons-'+getDueDateIconName"></i></div>
  <p>{{getFixedDueDate}}</p>
</div>

<section class="task-indicators">
  <span v-if="task.description" class="task-indicator trellicons trellicons-description"></span>
<div v-if="task.comments?.length" class="task-indicator">
  <span class="trellicons trellicons-comment"></span>
  <p>{{task.comments.length}}</p>
</div>
<div v-if="task.attachment?.length" class="task-indicator">
  <span class="trellicons trellicons-attachment"></span>
  <p>{{task.attachment.length}}</p>
</div>
<div v-if="task.checklists?.length" class="task-indicator">
  <span class="trellicons trellicons-checkedbox"></span>
  <p>{{task.checklists.length}}</p>
</div>
</section>
</div>
      <section v-if="task.memberIds?.length" class="task-members-container">
        <avatar-preview
          v-for="memberId in task.memberIds"
          :key="memberId"
          :member="getMemberById(memberId)"
          :avatarSize="'small'"
        />
      </section>
      </section>
    </div>
  </div>

  <div v-show="isOpen" class="quick-card-editor">
    <span
      class="icon-lg icon-close quick-card-editor-close-icon trellicons trellicons-close-btn"
    >
    </span>
    <div
      :style="getCords"
      v-click-outside="closeQuickEdit"
      class="quick-card-editor-card"
    >
      <div
        :style="task?.styles"
        class="list-card list-card-quick-edit is-covered"
      >
        <div class="list-card-details">
          <div v-if="task?.labels?.length" class="list-card-labels">
            <span
              v-for="label in task?.labels"
              :key="label.id"
              :style="`backgroundColor:${label.color}`"
              >{{ label }}</span
            >
          </div>
          <textarea
            data-autosize="true"
            dir="auto"
            style="
              overflow: hidden;
              overflow-wrap: break-word;
              resize: none;
              height: 90px;
            "
          ></textarea>
          <div class="badges">
            <span class="badges-container">
              <div v-if="task?.isWatched" class="badge badge-watch">
                <i class="fa-regular fa-eye"></i>
              </div>
              <div v-if="task?.comments?.length" class="badge comments">
                <i class="fa-regular fa-message"></i
                ><span>{{ task?.comments.length }}</span>
              </div>
              <div v-if="task?.attachments?.length" class="badge attachments">
                <i class="fa-regular fa-link"></i
                ><span>{{ task?.attachments.length }}</span>
              </div>
            </span>
          </div>
          <div v-if="task?.members?.length" class="list-card-members">
            <div
              v-for="member in task.members"
              :key="member._id"
              class="member"
              :style="`backgroundImage:url(${member.imgUrl}),border-radius:50%,height:30px,width:30px`"
            ></div>
          </div>
        </div>
      </div>
      <button class="save-task-btn text-center">Save</button>
      <div class="quick-card-editor-buttons fade-in">
        <span
          class="quick-card-editor-buttons-item"
          @click.stop="openTask(task.groupId, task.id)"
        >
          <span class="icon-sm icon-card"
            ><i class="fa-solid fa-inbox"></i></span
          ><span class="quick-card-editor-buttons-item-text">Open card</span>
        </span>
        <span href="#" class="quick-card-editor-buttons-item"
          ><span class="icon-sm icon-label"
            ><i class="fa-solid fa-tag"></i></span
          ><span class="quick-card-editor-buttons-item-text"
            >Edit Labels</span
          ></span
        >
        <span href="#" class="quick-card-editor-buttons-item">
          <span class="icon-sm icon-member"
            ><i class="fa-regular fa-user"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text"
            >Change members</span
          ></span
        >
        <span href="#" class="quick-card-editor-buttons-item"
          ><span class="icon-sm icon-card-cover"
            ><i class="fa-solid fa-inbox"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text"
            >Change cover</span
          ></span
        >
        <span href="#" class="quick-card-editor-buttons-item">
          <span class="icon-sm icon-move"
            ><i class="fa-solid fa-arrow-right"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text">Move</span>
        </span>
        <span href="#" class="quick-card-editor-buttons-item">
          <span class="icon-sm icon-card"
            ><i class="fa-solid fa-inbox"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text">Copy</span>
        </span>
        <span href="#" class="quick-card-editor-buttons-item">
          <span class="icon-sm icon-clock"
            ><i class="fa-regular fa-clock"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text">Edit dates</span>
        </span>
        <span href="#" class="quick-card-editor-buttons-item">
          <span class="icon-sm icon-archive"
            ><i class="fa-solid fa-box-archive"></i
          ></span>
          <span class="quick-card-editor-buttons-item-text">Archive</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import taskLabelList from './task-label-list.vue'
import avatarPreview from './avatar-preview.vue'

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
    toggleDueDateCheck(){
      const newStatus= this.task.status==='in-progress'? 'done':'in-progress'
      const savedTask=this.task
      savedTask.status=newStatus
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(savedTask)),
        groupId:this.task.groupId,
      })
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
      console.log(this.task.style);
      this.closeQuickEdit()
      this.$router.push(
        this.$router.currentRoute._value.path + `/${groupId}/${taskId}`
      )
    },
    getMemberById(memberId) {
      const members = this.$store.getters.getMembers
      return members.find((member) => member._id === memberId)
    },
  },
  computed: {
    getCords() {
      return { top: this.y + 'px', left: this.x - 228 + 'px' }
    },
    getFixedDueDate(){
      return (new Date(this.task.dueDate) + '').slice(4, 10)
    },
    dueDateStyle(){
      return{
        backgroundColor:this.task.status==='in-progress'?(this.onDueDateHover?'#eb5a46':'#ec9488'):(this.onDueDateHover?'#519839':'#61bd4f')
      }
    },
    getDueDateIconName(){
      const currCheckbox=this.task.status==='in-progress'?'un-checkedbox':'checkedbox'
return this.onDueDateHover?currCheckbox:'clock'
    }
  },
  emits: ['click'],
  components: {
    taskLabelList,
    avatarPreview,
  },
}
</script>
<style></style>
