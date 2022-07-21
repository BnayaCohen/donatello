<template>
  <section
    class="container task-detail"
    @click="
      isDate = false;
      isDateSide = false;
    "
  >
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
        ><button class="close-modal-btn" @click="updateTask">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256px"
            height="256px"
            viewBox="0 0 256 256"
            id="Flat"
          >
            <path
              d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"
            />
          </svg></button
      ></router-link>
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
          @keydown.enter="
            saveTask;
            $refs.taskTitle.blur();
          "
        />
      </div>
      <div class="task-detail-container flex">
        <div class="task-detail-main">
          <div class="members-labels-container flex align-center">
            <div class="labels-container">
              <h3 class="small-title">Labels</h3>
              <div class="task-labels">
                <div
                  class="label-prev"
                  v-for="label in taskLabels"
                  :key="label.id"
                >
                  <div
                    class="label-bg flex align-center justify-center"
                    :style="{ backgroundColor: label.color }"
                  >
                    <span>{{ label.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="task?.dueDate"
              class="due-date-container flex align-center"
            >
              <h3 class="small-title">Due Date</h3>
              <label
                class="flex"
                for="due-date-picker"
                @click.stop="isDate = !isDate"
              >
                <el-checkbox type="checkbox" class="date-checkbox" />
                <button class="due-date-btn">
                  <span class="due-date-txt">{{ dueDateFixed }}</span>
                  <svg
                    width="24"
                    height="24"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </label>
              <div class="pos-absolute">
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
            <div class="sidebar-btns flex flex-column">
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle fill="none" cx="12" cy="7" r="3"></circle>
                    <path
                      d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"
                    ></path>
                  </svg>
                  <span>Members</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <button
                  class="sidebar-btn flex align-center"
                  @click="toggleLabels"
                >
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
                      d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"
                    ></path>
                  </svg>
                  <span>Labels</span>
                </button>
                <div ref="labelOpts" class="dynamic-popover pos-absolute">
                  <div class="popover-header flex justify-center align-center">
                    <h4>Labels</h4>
                    <button
                      class="pop-close-btn pos-absolute"
                      @click="toggleLabels"
                    >
                      x
                    </button>
                  </div>
                  <div class="popover-content label-list-container">
                    <div class="search-labels">
                      <input type="text" placeholder="Search labels..." />
                    </div>
                    <h3 class="small-title">Labels</h3>
                    <ul class="clean-list">
                      <li
                        v-for="label in labels"
                        :key="label.id"
                        @click.stop="addLabel(label.id)"
                        class="label flex align-center"
                        :style="{ backgroundColor: label.color }"
                      >
                        <span>{{ label.title }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Checklist</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <label
                  for="date-picker-side"
                  @click.stop="isDateSide = !isDateSide"
                >
                  <button class="sidebar-btn flex align-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Dates</span>
                  </button>
                </label>
                <datepicker
                  v-if="isDateSide"
                  :inline="true"
                  class="datepicker-side"
                  id="date-picker-side"
                  v-model="dueDate"
                  @update:modelValue="updateDueDate"
                ></datepicker>
              </div>
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                    ></path>
                  </svg>
                  <span>Attachment</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
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
                  <span>Cover</span>
                </button>
              </div>
            </div>
            <div class="actions pos-relative">
              <h3 class="small-title">Actions</h3>
              <div class="sidebar-btns flex flex-column">
                <div class="sidebar-btn-container">
                  <button
                    class="sidebar-btn flex align-center"
                    @click="removeTask"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 14 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z"
                      ></path>
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { boardService } from '../services/board-service.js';
import Datepicker from 'vuejs3-datepicker';
import { ref } from 'vue';

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
      isDateSide: false,
      labels: null,
      taskLabels: [],
    };
  },
  async created() {
    const { boardId, taskId, groupId } = this.$route.params;
    if (!this.$store.getters.board || !this.$store.getters.getLabels) {
      await this.$store.dispatch({ type: 'loadBoard', boardId });
    }
    this.labels = this.$store.getters.getLabels;
    this.task = await boardService.getTaskById(boardId, groupId, taskId);
    this.task.labelIds.map((labelId) => {
      this.labels.forEach((label) => {
        if (label.id === labelId) this.taskLabels.push(label);
      });
    });
    console.log(this.taskLabels);
    this.$refs.taskTitle.value = this.task.title;
    this.$refs.taskDescription.value = this.task.description;
  },
  methods: {
    updateTask() {
      const { groupId } = this.$route.params;
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(this.task)),
        groupId,
      });
      this.isEditDescription = false;
    },
    updateDueDate() {
      const chosenDate = new Date(this.dueDate);
      const timestamp = chosenDate.getTime();
      this.task.dueDate = timestamp;
    },
    toggleLabels() {
      const elLabels = this.$refs.labelOpts;
      elLabels.classList.toggle('show');
    },
    addLabel(labelId) {
      if (!this.task.labelIds || !this.task.labelIds.length) {
        this.task.labelIds = [];
      }
      for (var i = 0; i < this.task.labelIds.length; i++) {
        if (this.task.labelIds[i] === labelId) {
          this.task.labelIds.splice(i, 1);
          this.updateTask();
          return;
        }
      }
      this.task.labelIds.push(labelId);
      this.updateTask();
    },
    async removeTask() {
      const { boardId, taskId, groupId } = this.$route.params;
      await this.$store.dispatch({ type: 'removeTask', taskId, groupId });
      this.$router.push('/board/' + boardId);
    },
  },
  computed: {
    dueDateFixed() {
      if (this.task?.dueDate) {
        var fixedDate = (new Date(this.task.dueDate) + '').slice(4, 10);
        console.log(fixedDate);
        fixedDate += ' at 12:00 AM';
        return fixedDate;
      }
    },
    taskBgColor() {
      if (this.task.style.bgColor) {
        return { backgroundColor: this.task.style.bgColor };
      } else return '';
    },
  },
  components: { Datepicker },
};
</script>
<style></style>
