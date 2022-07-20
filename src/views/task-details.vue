<template>
  <section class="container task-detail">
    <div class="detail-modal-container">
      <div
        v-if="task.style?.bgColor"
        class="task-detail-bg"
        :style="taskBgColor"
      ></div>
      <div v-if="task.style?.bgColor" class="btn-wrapper">
        <button class="cover-btn">
          <span class="cover-icon">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.2"
              baseProfile="tiny"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M17 7h-11c-1.654 0-3 1.346-3 3v7c0 1.654 1.346 3 3 3h11c1.654 0 3-1.346 3-3v-7c0-1.654-1.346-3-3-3zm1 10c0 .552-.448 1-1 1h-11c-.552 0-1-.448-1-1v-4h13v4zm0-6h-13v-1c0-.552.448-1 1-1h11c.552 0 1 .448 1 1v1zM14 16h2c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-2c-.276 0-.5.224-.5.5s.224.5.5.5z"
                ></path>
              </g>
            </svg>
            Cover
          </span>
        </button>
      </div>
      <router-link :to="'/board/' + this.$route.params.boardId"
        ><button class="btn close-modal-btn" @click="updateTask">
          X
        </button></router-link
      >
      <div class="task-detail-header">
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 9C4 8.44772 4.44772 8 5 8H9C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 3C1.79086 3 0 4.79086 0 7V17C0 19.2091 1.79086 21 4 21H20C22.2091 21 24 19.2091 24 17V7C24 4.79086 22.2091 3 20 3H4ZM20 5H4C2.89543 5 2 5.89543 2 7V14H22V7C22 5.89543 21.1046 5 20 5ZM22 16H2V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V16Z"
            fill="currentColor"
          ></path>
        </svg>
        <input
          class="title-input"
          type="text"
          ref="taskTitle"
          v-model="task.title"
          placeholder="Enter title here..."
        />
      </div>
      <div class="task-detail-container flex">
        <div class="task-detail-main">
          <div class="members-labels-container flex align-center">
            <div class="labels-container">
              <h3 class="small-title">Labels</h3>
              <div class="labels"></div>
            </div>
            <div
              v-if="task?.dueDate"
              class="due-date-container flex align-center"
            >
              <h3 class="small-title">Due Date</h3>
              <label for="due-date-picker" @click="isDate = !isDate">
                <div class="task-detail-btn">
                  <el-checkbox type="checkbox" class="date-checkbox" />
                  <span class="due-date-txt">{{ dueDateFixed }}</span>
                </div>
              </label>
              <div class="dynamic-popover pos-absolute">
                <datepicker
                  v-if="isDate"
                  :inline="true"
                  class="due-date-picker"
                  id="due-date-picker"
                  v-model="dueDate"
                  @update:modelValue="updateDueDate"
                ></datepicker>
              </div>
            </div>
          </div>
          <div class="description-container flex">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 280h256v48H80zM80 184h320v48H80zM80 88h352v48H80z"
              ></path>
              <g><path d="M80 376h288v48H80z"></path></g>
            </svg>
            <h3>Description</h3>
          </div>
          <div class="task-description-txt">
            <textarea
              rows="3"
              placeholder="Add detailed description..."
              ref="taskDescription"
              v-model="task.description"
              @click="isEditDescription = !isEditDescription"
            ></textarea>
            <div
              v-if="isEditDescription"
              class="description-btns flex align-center"
            >
              <el-button @click="updateTask">Save</el-button>
              <el-button @click="isEditDescription = false">X</el-button>
            </div>
          </div>
          <div class="comment-container flex justify-between align-center">
            <div class="task-detail-title">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
                ></path>
              </svg>
              <h3>Comments</h3>
            </div>
          </div>
        </div>
        <div class="detail-sidebar">
          <div class="pos-relative">
            <h3 class="small-title">Add to card</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { boardService } from '../services/board-service.js'
import Datepicker from 'vuejs3-datepicker'
import { ref } from 'vue'

export default {
  name: 'taskDetails',
  props: {
    taskId: String,
  },
  data() {
    return {
      task: boardService.getEmptyTask(),
      isEditDescription: false,
      dueDate: ref(new Date()),
      isDate: false,
    }
  },
  async created() {
    const { boardId, taskId, groupId } = this.$route.params
    if (!this.$store.getters.board)
      await this.$store.dispatch({ type: 'loadBoard', boardId })
    this.task = await boardService.getTaskById(boardId, groupId, taskId)
    this.$refs.taskTitle.value = this.task.title
    this.$refs.taskDescription.value = this.task.description
  },
  methods: {
    updateTask() {
      const { groupId } = this.$route.params
      this.$store.dispatch({ type: 'saveTask', task: this.task, groupId })
      this.isEditDescription = false
    },
    updateDueDate() {
      const chosenDate = new Date(this.dueDate)
      const timestamp = chosenDate.getTime()
      this.task.dueDate = timestamp
    },
  },
  computed: {
    dueDateFixed() {
      if (this.task?.dueDate) {
        var fixedDate = (new Date(this.task.dueDate) + '').slice(4, 10)
        console.log(fixedDate)
        fixedDate += ' at 12:00 AM'
        return fixedDate
      }
    },
    taskBgColor() {
      if (this.task.style.bgColor) {
        return { backgroundColor: this.task.style.bgColor }
      } else return ''
    },
  },
  components: { Datepicker },
}
</script>
<style></style>
