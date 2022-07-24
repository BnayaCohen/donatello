<template>
  <section
    class="container task-detail"
    @click=";[(isDate = false), (isDateSide = false)]"
  >
    <div
      class="back-screen"
      :style="{
        backgroundColor: '#000000a3',
        cursor: 'pointer',
      }"
    >
      <div class="detail-modal-container" v-click-outside="backToBoard">
        <cover-bg :task="task" @coverClicked="toggleCover" @closeModal="backToBoard"/>
        <div class="task-detail-header">
          <span class="trellicons trellicons-details"></span>
          <textarea
            rows="1"
            class="title-input"
            type="text"
            ref="taskTitle"
            v-model="task.title"
            placeholder="Enter title here..."
            @keydown.enter="$refs.taskTitle.blur()"
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
              <label-prev :taskLabels="taskLabels" @labelClicked="toggleLabels"/>
              <date-picker v-if="task.dueDate" :task="task" @toggleDate="toggleDate" @toggleIsDone="toggleIsDone" @removeDueDate="removeDueDate"/>
            </div>
            <div class="description-container flex flex-column">
              <div class="description-header flex align-center">
                <span class="trellicons trellicons-description"></span>
                <h3>Description</h3>
              </div>
              <div class="task-description-txt">
                <textarea
                  rows="3"
                  placeholder="Add a more detailed description..."
                  ref="taskDescription"
                  v-model="task.description"
                  @click.stop="isEditDescription = !isEditDescription"
                  :class="descriptionStyle"
                ></textarea>
                <div
                  v-if="isEditDescription"
                  class="description-btns flex align-center"
                >
                  <el-button @click.stop="updateTask">Save</el-button>
                  <el-button @click.stop="isEditDescription = false"
                    >X</el-button
                  >
                </div>
              </div>
            </div>
            <div
              v-if="task?.attachment"
              class="attachment-container flex flex-column"
            >
              <attachment-preview
                :attachment="task.attachment"
                @updateCurrCover="updateCurrCover"
              />
            </div>
            <div class="comment-container flex justify-between align-center">
              <div class="task-detail-title">
                <span class="trellicons trellicons-comments"></span>
                <h3>Comments</h3>
              </div>
            </div>
          </div>
          <task-detail-sidebar :task="task" :currCover="currCover" @toggleLabels="toggleLabels" @toggleDate="toggleDate" @toggleAttach="toggleAttach" @addUserToTask="addUserToTask" @toggleCover="toggleCover" @removeTask="removeTask"/>
        </div>
      </div>
    </div>
  </section>
  <attachment-picker
    v-if="isAttach"
    @attachSelected="addAttachment"
    @closeAttach="isAttach = false"
    :pos="getCords"
    v-click-outside="closeAttach"
  />
  <cover-picker
    v-if="isCover"
    :colors="coverColors"
    @addCover="addCover"
    @closeCover="isCover = false"
    :pos="getCords"
    v-click-outside="closeCover"
  />
  <label-picker
    v-if="isLabels"
    :labels="labels"
    :taskLabels="taskLabels"
    @addLabel="addLabel"
    @closeLabels="isLabels = false"
    :pos="getCords"
    v-click-outside="closeLabels"
  />
  <date v-if="isDate" @updateDueDate="updateDueDate" :pos="getCords" :dueDate="dueDate"/>
</template>
<script>
import { boardService } from '../services/board-service.js'
import labelPicker from '../cmps/task-details-cmps/label-picker.vue'
import coverPicker from '../cmps/task-details-cmps/cover-picker.vue'
import attachmentPicker from '../cmps/task-details-cmps/attachment-picker.vue'
import attachmentPreview from '../cmps/task-details-cmps/attachment-preview.vue'
import avatarPreview from '../cmps/avatar-preview.vue'
import { userService } from '../services/user-service.js'
import coverBg from '../cmps/task-details-cmps/cover-bg.vue'
import labelPrev from '../cmps/task-details-cmps/label-prev.vue'
import datePicker from '../cmps/task-details-cmps/date-picker.vue'
import date from '../cmps/date.vue'
import taskDetailSidebar from '../cmps/task-details-cmps/task-detail-sidebar.vue'
import TaskDetailSidebar from '../cmps/task-details-cmps/task-detail-sidebar.vue'
import { ref } from 'vue'

export default {
  name: 'taskDetails',
  // props: {
  //   taskId: String,
  //   boardId: String,
  //   groupId: String,
  // },
  data() {
    return {
      task: boardService.getEmptyTask(),
      isEditDescription: false,
      isDate: false,
      isDateSide: false,
      taskLabels: [],
      labels: null,
      isLabels: false,
      isCover: false,
      isTopCover: false,
      isAttach: false,
      coverColors: null,
      clickPos: {
        x: null,
        y: null,
      },
      currCover: null,
      dueDate: ref(new Date()),
    }
  },
  async created() {
    const { boardId, taskId, groupId } = this.$route.params
    const currBoard = this.$store.getters.board
    if (!currBoard || !currBoard.labels.length) {
      await this.$store.dispatch({ type: 'loadBoard', boardId })
    }
    this.labels = this.$store.getters.getLabels
    this.task = await boardService.getTaskById(boardId, groupId, taskId)
    // TODO: add labels to each board in service
    if (this.task.labelIds) {
      this.task.labelIds.map((labelId) => {
        this.labels.forEach((label) => {
          if (label.id === labelId) this.taskLabels.push(label)
        })
      })
    }
    this.coverColors = this.$store.getters.getCoverColors
    if (this.task?.style?.background)
      this.currCover = { background: this.task.style.background }
    this.$refs.taskDescription.value = this.task.description
  },
  computed: {
    dueDateFixed() {
      if (this.task?.dueDate) {
        var fixedDate = (new Date(this.task.dueDate) + '').slice(4, 10)
        fixedDate += ' at 12:00 AM'
        return fixedDate
      }
    },
    groupTitle() {
      const { groupId } = this.$route.params
      const board = this.$store.getters.board
      if (board?._id) {
        const groups = board.groups
        const group = groups.find((group) => group.id === groupId)
        return group.title
      }
    },
    descriptionStyle() {
      return this.isEditDescription
        ? 'description-textarea'
        : 'description-fake-textarea'
    },
    getCords() {
      return {
        top: this.clickPos.y + 'px',
        left: this.clickPos.x - 100 + 'px',
      }
    },
  },
  methods: {
    addUserToTask() {
      if (!this.task.memberIds)
        this.task.memberIds = [userService.getLoggedInUser()._id]
      else this.task.memberIds.push(userService.getLoggedInUser()._id)
      console.log(this.task.memberIds)
      this.updateTask()
    },
    closeLabels() {
      this.isLabels = !this.isLabels
    },
    closeAttach() {
      this.isAttach = !this.isAttach
    },
    closeCover() {
      this.isCover = !this.isCover
    },
    updateTask() {
      console.log(this.task.title)
      const { groupId } = this.$route.params
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(this.task)),
        groupId,
      })
      this.isEditDescription = false
    },
    toggleCover(ev) {
      this.clickPos.x = ev.clientX
      this.clickPos.y = ev.clientY
      this.isCover = !this.isCover
    },
    toggleLabels(ev) {
      this.clickPos.x = ev.clientX
      this.clickPos.y = ev.clientY
      this.isLabels = !this.isLabels
    },
    toggleAttach(ev) {
      this.clickPos.x = ev.clientX
      this.clickPos.y = ev.clientY
      this.isAttach = !this.isAttach
    },
    toggleDate(ev) {
      console.log(this.isDate)
      this.clickPos.x = ev.clientX
      this.clickPos.y = ev.clientY
      this.isDate = !this.isDate

    },
    updateDueDate(dueDate) {
      this.dueDate = dueDate
      const timestamp = dueDate.getTime()
      this.task.dueDate = timestamp
      this.updateTask()
    },
    // updateTaskLabels() {
    //   this.task.labelIds.map((labelId) => {
    //     this.labels.forEach((label) => {
    //       if (label.id === labelId && !this.taskLabels.includes(labelId)) this.taskLabels.push(label);
    //     });
    //   });
    // },
    addLabel(labelId) {
      if (!this.task.labelIds || !this.task.labelIds.length) {
        this.task.labelIds = []
      }
      for (var i = 0; i < this.task.labelIds.length; i++) {
        if (this.task.labelIds[i] === labelId) {
          this.task.labelIds.splice(i, 1)
          this.updateTask()
          const idx = this.taskLabels.findIndex(
            (taskLabel) => taskLabel.id === labelId
          )
          this.taskLabels.splice(idx, 1)
          return
        }
      }
      this.task.labelIds.push(labelId)
      this.updateTask()
      const label = this.labels.find((taskLabel) => taskLabel.id === labelId)
      this.taskLabels.push(label)
    },
    toggleIsDone() {
      switch (this.task.status) {
        case 'done':
          this.task.status = 'in-progress'
          break
        case 'in-progress':
          this.task.status = 'done'
          break
      }
      this.updateTask()
    },
    addAttachment(attachProps) {
      const { url, title, createdAt } = attachProps
      if (!this.task?.attachment) this.task.attachment = {}
      this.task.attachment.url = url
      this.task.attachment.title = title
      this.task.attachment.createdAt = createdAt
      if (!this.task.style) this.task.style = {}
      this.task.style.background = attachProps.url
      if (this.task.style?.bgColor) this.task.style.bgColor = ''
      this.isAttach = false
      this.currCover = { background: this.task.style.background }
      this.updateTask()
    },
    async removeTask() {
      const { boardId, taskId, groupId } = this.$route.params
      await this.$store.dispatch({ type: 'removeTask', taskId, groupId })
      this.$router.push('/board/' + boardId)
    },
    addCover(color) {
      if (!this.task?.style) this.task.style = {}
      this.task.style.background = color
      this.currCover = { background: this.task.style.background }
      this.updateTask()
    },
    removeDueDate() {
      this.task.dueDate = ''
      this.task.status = 'in-progress'
      this.updateTask()
    },
    backToBoard() {
      this.updateTask()
      this.$router.push('/board/' + this.$route.params.boardId)
    },
    updateCurrCover(coverStyle) {
      if (!this.task?.style) this.task.style = {}
      this.task.style.background = coverStyle.backgroundImage
      this.currCover = coverStyle
      this.updateTask()
    },
  },
  components: {
    labelPicker,
    coverPicker,
    attachmentPicker,
    attachmentPreview,
    avatarPreview,
    coverBg,
    labelPrev,
    datePicker,
    date,
    taskDetailSidebar,
    TaskDetailSidebar
},
}
</script>
<style></style>
