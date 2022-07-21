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
          <span class="cover-icon"> Cover </span>
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
        <span class="trellicons trellicons-details"></span>
        <textarea
          class="title-input"
          type="text"
          ref="taskTitle"
          v-model="task.title"
          placeholder="Enter title here..."
          @keydown.enter="
            saveTask;
            $refs.taskTitle.blur();
          "
        ></textarea>
      </div>
      <div class="subtitle-header">
        <p>
          in list
          <span :style="{ textDecoration: 'underline' }">{{ groupTitle }}</span>
        </p>
      </div>
      <div class="task-detail-container flex">
        <div class="task-detail-main flex flex-column">
          <div class="members-labels-container flex align-center">
            <div class="labels-container">
              <h3 v-show="this.taskLabels.length" class="small-title">
                Labels
              </h3>
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
                      d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
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
            <span class="trellicons trellicons-description"></span>
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
              <span class="trellicons trellicons-comments"></span>
              <h3>Comments</h3>
            </div>
          </div>
        </div>
        <div class="detail-sidebar">
          <div class="pos-relative">
            <div class="suggested-btns">
              <h3 class="small-title">Suggested</h3>
              <button class="sidebar-btn flex align-center">
                <span class="trellicons trellicons-member"></span>
                <span>Join</span>
              </button>
            </div>

            <h3 class="small-title">Add to card</h3>
            <div class="sidebar-btns flex flex-column">
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <span class="trellicons trellicons-member"></span>
                  <span>Members</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <button
                  class="sidebar-btn flex align-center"
                  @click="toggleLabels"
                >
                  <span class="trellicons trellicons-labels"></span>
                  <span>Labels</span>
                </button>
                <div ref="labelOpts" class="dynamic-popover pos-absolute">
                  <div class="popover-header flex justify-center align-center">
                    <h4>Labels</h4>
                    <button class="pop-close-btn" @click="toggleLabels">
                      <span class="trellicons trellicons-close"></span>
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
                      >
                        <div
                          :style="{
                            borderRadius: '3px',
                            width: '100%',
                            height: '32px',
                            backgroundColor: label.color,
                          }"
                        ></div>
                        <span class="pos-absolute">{{ label.title }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <span class="trellicons trellicons-checklist"></span>
                  <span>Checklist</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <label
                  for="date-picker-side"
                  @click.stop="isDateSide = !isDateSide"
                >
                  <button class="sidebar-btn flex align-center">
                    <div :style="{ width: '16px', height: '16px' }">
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
                    </div>
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
                  <span class="trellicons trellicons-attachment"></span>
                  <span>Attachments</span>
                </button>
              </div>
              <div class="sidebar-btn-container">
                <button class="sidebar-btn flex align-center">
                  <span class="trellicons trellicons-cover"></span>
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
                    <span class="trellicons trellicons-archive"></span>
                    <span>Archive</span>
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
    if (this.task.labelIds) {
      this.task.labelIds.map((labelId) => {
        this.labels.forEach((label) => {
          if (label.id === labelId) this.taskLabels.push(label);
        });
      });
    }
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
    // updateTaskLabels() {
    //   this.task.labelIds.map((labelId) => {
    //     this.labels.forEach((label) => {
    //       if (label.id === labelId && !this.taskLabels.includes(labelId)) this.taskLabels.push(label);
    //     });
    //   });
    // },
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
          const idx = this.taskLabels.findIndex(
            (taskLabel) => taskLabel.id === labelId
          );
          this.taskLabels.splice(idx, 1);
          return;
        }
      }
      this.task.labelIds.push(labelId);
      this.updateTask();
      const label = this.labels.find((taskLabel) => taskLabel.id === labelId);
      this.taskLabels.push(label);
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
    groupTitle() {
      const { groupId } = this.$route.params;
      const groups = this.$store.getters.board.groups;
      const group = groups.find((group) => group.id === groupId);
      return group.title;
    },
  },
  components: { Datepicker },
};
</script>
<style></style>
