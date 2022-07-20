<template>
  <section class="container task-detail">
    <div class="detail-modal-container">
      <div class="task-detail-bg"></div>
      <div class="btn-wrapper">
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
          </span>
          Cover
        </button>
      </div>
      <router-link :to="'/board/' + this.$route.params.boardId"
        ><button class="btn close-modal-btn">X</button></router-link
      >
      <div class="task-detail-header">
        <span
          ><svg
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
        </span>
        <input class="title-input" type="text" />
      </div>
      <div class="task-detail-container flex">
        <div class="task-detail-main">
          <div class="label-date-container flex">
            <div class="labels-container">
              <span>Labels</span>
              <div class="labels"></div>
            </div>
            <div class="due-date-container flex align-center">
              <span>Due Date</span>
              <input type="checkbox" class="date-checkbox" />
              <div class="task-detail-btn">
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="description-container flex">
            <span>
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
            </span>
          </div>
          <div class="task-description-txt">
            <textarea
              rows="3"
              placeholder="Add detailed description..."
              ref="taskTitle"
              v-model="task.title"
              @click="isEditTitle = !isEditTitle"
            ></textarea>
            <div v-if="isEditTitle" class="description-btns flex align-center">
              <el-button @click="updateTitle">Save</el-button>
              <el-button @click="isEditTitle = false">X</el-button>
            </div>
          </div>
          <div class="comment-container">
            <section class="flex justify-between">
              <div class="task-detail-title">
                <span>
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
                  <h3>Comments</h3>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { boardService } from '../services/board-service.js'
export default {
  name: 'taskDetails',
  props: {
    taskId: String,
  },
  data() {
    return {
      task: boardService.getEmptyTask(),
      isEditTitle: false,
    }
  },
  async created() {
    const { boardId, taskId, groupId } = this.$route.params
    this.task = await boardService.getTaskById(boardId, groupId, taskId)
    this.$refs.taskTitle.value = this.task.title
  },
  methods: {
    updateTitle() {
      const { groupId } = this.$route.params
      this.$store.dispatch({type: 'saveTask', task: this.task, groupId})
    },
  },
}
</script>
<style></style>
