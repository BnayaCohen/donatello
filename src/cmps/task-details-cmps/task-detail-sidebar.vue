<template>
  <div class="detail-sidebar">
    <div class="pos-relative">
      <div v-if="!userAssigned" class="suggested-btns">
        <h3 class="small-title">Suggested</h3>
        <button class="sidebar-btn flex align-center" @click="addUserToTask">
          <span class="trellicons trellicons-member"></span>
          <span>Join</span>
        </button>
      </div>

      <h3 class="small-title" :style="{ marginTop: '15.5px' }">Add to card</h3>
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
            @click="toggle($event, 'Labels')"
          >
            <span class="trellicons trellicons-labels"></span>
            <span>Labels</span>
          </button>
        </div>
        <div class="sidebar-btn-container">
          <button
            class="sidebar-btn flex align-center"
            @click="toggle($event, 'Checklist')"
          >
            <span class="trellicons trellicons-checklist"></span>
            <span>Checklist</span>
          </button>
        </div>
        <div class="sidebar-btn-container">
          <label for="date-picker-side" @click="toggle($event, 'Date')">
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
        </div>
        <div class="sidebar-btn-container">
          <button
            class="sidebar-btn flex align-center"
            @click="toggle($event, 'Attach')"
          >
            <span class="trellicons trellicons-attachment"></span>
            <span>Attachments</span>
          </button>
        </div>
        <div class="sidebar-btn-container">
          <button
            v-show="!currCover"
            class="sidebar-btn flex align-center"
            @click="toggle($event, 'Cover')"
          >
            <span class="trellicons trellicons-cover"></span>
            <span>Cover</span>
          </button>
        </div>
      </div>
      <div class="actions pos-relative">
        <h3 class="small-title">Actions</h3>
        <div class="sidebar-btns flex flex-column">
          <div class="sidebar-btn-container">
            <button class="sidebar-btn flex align-center" @click="$emit('removeTask')">
              <span class="trellicons trellicons-archive"></span>
              <span>Archive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userService } from '../../services/user-service.js'
export default {
  props: {
    currCover: Object,
    task: Object,
  },
  data() {
    return {}
  },
  computed: {
    userAssigned() {
      return this.task.memberIds?.find(
        (id) => id === userService.getLoggedInUser()._id
      )
        ? true
        : false
    },
  },
  methods: {
    toggle(ev, type) {
      this.$emit('toggle', { ev, type })
    },

    addUserToTask() {
      this.$emit('addUserToTask')
    },
    removeTask() {
      this.$emit('removeTask')
    },
  },
  emits: ['toggle', , 'addUserToTask', 'removeTask'],
}
</script>
<style></style>
