<template>
  <Draggable>
    <li
      @mouseenter="toggleOnHover"
      @mouseleave="toggleOnHover"
      class="task-preview"
      @click="openTask(task.groupId, task.id)"
    >
      <div class="flex flex-column">
        <span v-if="onHover" @click.stop="openSideBar" class="hover-edit-btn"
          ><i class="fa-solid fa-pencil"></i
        ></span>
        <div class="task-preview-header">
          <div v-if="task?.styles" class="image-wrapper"></div>
        </div>
        <p>{{ task?.title }}</p>
      </div>
    </li>
  </Draggable>
  <div v-show="isOpen" class="quick-card-editor">
    <span
      @click="closeSideBar"
      class="icon-lg icon-close quick-card-editor-close-icon"
      ><svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="xmark"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class="svg-inline--fa fa-xmark fa-xl"
      >
        <path
          fill="currentColor"
          d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          class=""
        ></path></svg
    ></span>
    <div :style="getCords" class="quick-card-editor-card">
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
        <router-link
          :to="`${$router.currentRoute._value.path}/${task?.groupId}/${task?.id}`"
          class="quick-card-editor-buttons-item"
        >
          <span class="icon-sm icon-card"
            ><i class="fa-solid fa-inbox"></i></span
          ><span class="quick-card-editor-buttons-item-text"
            >Open card</span
          ></router-link
        >
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
import { Draggable } from 'vue3-smooth-dnd'
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
      isOpen: false,
      x: 0,
      y: 0,
    }
  },
  methods: {
    toggleOnHover() {
      this.onHover = !this.onHover
    },
    openSideBar(ev) {
      this.x = ev.clientX
      this.y = ev.clientY
      this.isOpen = true
    },
    closeSideBar() {
      this.isOpen = false
    },
    openTask(groupId, taskId) {
      this.$router.push(
        this.$router.currentRoute._value.path + `/${groupId}/${taskId}`
      )
    },
  },
  computed: {
    getCords() {
      return { top: this.y + 'px', left: this.x - 228 + 'px' }
    },
  },
  emits: ['click'],
  components: { Draggable },
}
</script>
<style></style>
