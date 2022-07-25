<template>
  <section class="container task-detail">
    <div
      class="back-screen"
      :style="{
        backgroundColor: '#000000a3',
        cursor: 'pointer',
      }"
    >
      <div class="detail-modal-container" v-click-outside="backToBoard">
        <cover-bg :currCover="currCover" @toggle="toggle" @closeModal="backToBoard" />
        <div class="task-detail-header">
          <div>
          <span class="trellicons trellicons-details"></span>
          </div>
          <div>
            <textarea
              rows="1"
              class="title-input"
              type="text"
              ref="taskTitle"
              v-model="task.title"
              placeholder="Enter title here..."
              @keydown.enter="$refs.taskTitle.blur()"
            ></textarea>
        <div class="subtitle-header">
          <p>
            in list
            <span :style="{ textDecoration: 'underline' }">{{
              groupTitle
            }}</span>
          </p>
        </div>
        </div>
        </div>
        <div class="task-detail-container flex">
          <div class="task-detail-main flex flex-column">
            <div class="members-labels-container flex align-center">
              <label-prev :taskLabels="taskLabels" @toggle="toggle" />
              <date-picker
                v-if="task.dueDate"
                :task="task"
                @toggleDate="toggleDate"
                @toggleIsDone="toggleIsDone"
                @removeDueDate="removeDueDate"
              />
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
              <attachment-list
              v-if="task.attachments?.length"
                :attachments="task.attachments"
                @updateCurrCover="updateCurrCover"
                @toggle="toggle"
                @removeAttachment="removeAttachment"
              />
            <checklist-list
              v-if="task.checklists?.length"
              :checklists="task.checklists"
              @saveChecklists="saveChecklists"
            />
            <div class="comment-container flex justify-between align-center">
              <div class="task-detail-title">
                <span class="trellicons trellicons-comments"></span>
                <h3>Activity</h3>
              </div>
            </div>
          </div>
          <task-detail-sidebar
            :task="task"
            :currCover="currCover"
            @toggle="toggle"
            @addUserToTask="addUserToTask"
            @removeTask="removeTask"
          />
        </div>
      </div>
    </div>
  </section>
  <attachment-picker
    v-if="isAttach"
    @attachSelected="addAttachment"
    @toggle="toggle"
    :pos="getCords"
    v-click-outside="closeAttach"
  />
  <cover-picker
    v-if="isCover"
    :colors="coverColors"
    @addCover="addCover"
    @closeCover="closeCover"
    :pos="getCords"
    v-click-outside="closeCover"
  />
  <label-picker
    v-if="isLabels"
    :labels="labels"
    :taskLabels="taskLabels"
    @addLabel="addLabel"
    @toggle="isLabels = !isLabels"
    :pos="getCords"
    v-click-outside="closeLabels"
  />
  <date
    v-if="isDate"
    @updateDueDate="updateDueDate"
    :pos="getCords"
    :dueDate="dueDate"
    v-click-outside="closeDate"
  />
  <checklist-modal
    v-if="isChecklist"
    @addChecklist="addChecklist"
    :pos="getCords"
    v-click-outside="closeChecklist"
    @toggle="toggle"
  />
</template>
<script>
import checklistList from '../cmps/task-details-cmps/checklist-list.vue'
import checklistModal from '../cmps/task-details-cmps/checklist-modal.vue'
import { boardService } from '../services/board-service.js'
import { utilService } from '../services/util-service.js'
import labelPicker from '../cmps/task-details-cmps/label-picker.vue'
import coverPicker from '../cmps/task-details-cmps/cover-picker.vue'
import attachmentPicker from '../cmps/task-details-cmps/attachment-picker.vue'
import attachmentList from '../cmps/task-details-cmps/attachment-list.vue'
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
  data() {
    return {
      task: boardService.getEmptyTask(),
      isEditDescription: false,
      isDate: false,
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
      isChecklist: false,
    }
  },
  async created() {
    try {
      const { boardId, taskId, groupId } = this.$route.params
      const currBoard = this.$store.getters.board
      if (!currBoard) {
        await this.$store.dispatch({ type: 'loadBoard', boardId })
      }
      this.labels = this.$store.getters.getLabels
      await this.$store.dispatch({ type: 'loadTask', boardId, groupId, taskId })
      this.task = this.$store.getters.task
      // TODO: add labels to each board in service
      if (this.task.labelIds) {
        this.task.labelIds.map((labelId) => {
          this.labels.forEach((label) => {
            if (label.id === labelId) this.taskLabels.push(label)
          })
        })
      }
      this.coverColors = this.$store.getters.getCoverColors

      if (!this.task.style) this.task.style = {}
      if (this.task.style.background){
      // if(this.task.style.background.length>10)
      //   this.currCover = { background: `url(${this.task.style.background}) no-repeat center center/contain` }
         this.currCover = { background: this.task.style.background }
        }
        
      this.$refs.taskDescription.value = this.task.description
       if (!this.task.attachments) this.task.attachments = []
    } catch(err) {

    }
  },
  computed: {
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
    saveChecklists(checklists) {
      this.task.checklists = checklists
      this.updateTask()
    },
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
    closeChecklist() {
      this.isChecklist = !this.isChecklist
    },
    closeDate() {
      this.isDate = false
    },
    updateTask() {
      const { groupId } = this.$route.params
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(this.task)),
        groupId,
      })
      this.isEditDescription = false
    },
    toggleDate(ev) {
      this.clickPos.x = ev?.clientX
      this.clickPos.y = ev?.clientY
      this.isDate = !this.isDate
    },
    toggle(customEv) {
      console.log(customEv)
      this.clickPos.x = customEv?.ev?.clientX
      this.clickPos.y = customEv?.ev?.clientY
      this['is' + customEv.type] = !this['is' + customEv.type]
    },
    updateDueDate(dueDate) {
      this.dueDate = dueDate
      const timestamp = dueDate.getTime()
      this.task.dueDate = ref(timestamp)
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
      const newAttachment = attachProps
      newAttachment.id=utilService.makeId()
      this.task.attachments.unshift(newAttachment)
      this.isAttach = false
      this.updateTask()
    },
    removeAttachment(attachId){
      const attachIdx = this.task.attachments.findIndex(attach=>attach.id===attachId)
      this.task.attachments.splice(attachIdx,1)
      this.updateTask()
    },
    removeTask() {
      const { boardId, taskId, groupId } = this.$route.params
      this.$store.dispatch({ type: 'removeTask', taskId, groupId })
      this.$router.push('/board/' + boardId)
    },
    addCover(color) {
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
      this.$router.push('/board/' + this.$route.params.boardId)
    },
    updateCurrCover(cover) {
      this.task.style.background = cover
      this.currCover = { background:cover}
      this.updateTask()
    },
    addChecklist(checklist) {
      this.task.checklists = this.task.checklists?.length
        ? [...this.task.checklists, checklist]
        : [checklist]
      this.updateTask()
    },
  },
  components: {
    labelPicker,
    coverPicker,
    attachmentPicker,
    attachmentList,
    avatarPreview,
    coverBg,
    labelPrev,
    datePicker,
    date,
    taskDetailSidebar,
    TaskDetailSidebar,
    checklistModal,
    checklistList,
  },
}
</script>
