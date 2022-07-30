<template>
  <section v-if="task" class="container task-detail">
    <div class="back-screen" :style="{
      backgroundColor: '#000000a3',
      cursor: 'pointer',
    }">
      <div class="detail-modal-container" v-click-outside="backToBoard">
        <cover-bg :currCover="currCover" @toggle="openPicker" @closeModal="backToBoard" />
        <div class="task-detail-header">
          <div>
            <span class="trellicons trellicons-details"></span>
          </div>
          <div class="task-title-container">
            <textarea rows="1" class="basic-input title-input" type="text" ref="taskTitle" v-model="task.title"
              placeholder="Enter title here..." @keydown.enter="$refs.taskTitle.blur()" @blur="updateTask"></textarea>
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
              <member-prev :memberIds="task.memberIds" @pickerOpened="openPicker" />
              <label-prev :taskLabels="taskLabels" @toggle="openPicker" />
              <date-picker v-if="task.dueDate" :task="task" @toggle="toggleDate" @toggleIsDone="toggleIsDone"
                @removeDueDate="removeDueDate" />
            </div>
            <task-description :description="task.description" @saveDescription="saveDescription" />
            <attachment-list v-if="task.attachments?.length" :attachments="task.attachments"
              @updateCurrCover="updateCurrCover" @toggle="openPicker" @removeAttachment="removeAttachment" />
            <checklist-list v-if="task.checklists?.length" :checklists="task.checklists"
              @saveChecklists="saveChecklists" />
            <task-comment :loggedInUser="loggedUser" @saveComment="saveComment" :comments="task.comments"
              @deleteComment="deleteComment" />
          </div>
          <task-detail-sidebar :task="task" :currCover="currCover" @toggleDate="toggleDate" @pickerOpened="openPicker"
            @addUserToTask="addUserToTask" @removeTask="removeTask" />
        </div>
      </div>
    </div>
  </section>
  <!-- <date v-if="isDate" @updateDueDate="updateDueDate" @removeDueDate="removeDueDate" v-click-outside="toggleDate"
    :pos="modalPos" @toggleDate="toggleDate" /> -->

  <task-options v-if="isPickerCmpOpen" :cmpType="modalCmpType" :task="task" :pos="modalPos" :dueDate="dueDate"
    @removeDueDate="removeDueDate" @updateDueDate="updateDueDate" @updateCurrCover="updateCurrCover"
    @pickerClosed="isPickerCmpOpen = false" />
</template>
<script>
import memberPrev from '../cmps/task-details-cmps/memberPrev.vue'
import checklistList from '../cmps/task-details-cmps/checklist-list.vue'
import { utilService } from '../services/util-service.js'
import attachmentList from '../cmps/task-details-cmps/attachment-list.vue'
import avatarPreview from '../cmps/avatar-preview.vue'
import { userService } from '../services/user-service.js'
import coverBg from '../cmps/task-details-cmps/cover-bg.vue'
import labelPrev from '../cmps/task-details-cmps/label-prev.vue'
import datePicker from '../cmps/task-details-cmps/date-picker.vue'
import date from '../cmps/date.vue'
import taskDetailSidebar from '../cmps/task-details-cmps/task-detail-sidebar.vue'
import taskComment from '../cmps/task-details-cmps/task-comment.vue'
import taskOptions from '../cmps/task-options-cmp.vue'
import taskDescription from '../cmps/task-details-cmps/task-description.vue'
import { ref } from 'vue'

export default {
  name: 'taskDetails',
  data() {
    return {
      task: null,
      isEditDescription: false,
      isDate: false,
      modalPos: {
        top: '',
        left: '',
      },
      currCover: null,
      dueDate: ref(new Date()),
      isPickerCmpOpen: false,
      modalCmpType: '',
    }
  },
  async created() {
    try {
      const { boardId, taskId, groupId } = this.$route.params
      let currBoard = this.$store.getters.board

      if (!currBoard) {
        await this.$store.dispatch({ type: 'loadBoard', boardId })
        currBoard = this.$store.getters.board
      }

      const group = currBoard.groups.find((group) => group.id === groupId)
      this.task = group.tasks.find((task) => task.id === taskId)

      if (!this.task.style) this.task.style = {}

      this.currCover = { background: this.task.style.background }

      if (!this.task.attachments) this.task.attachments = []

      // this.$refs.taskDescription.value = this.task.description
    } catch (err) {
      console.log('cannot load task: ' + err)
    }
  },
  computed: {
    groupTitle() {
      const { groupId } = this.$route.params
      const board = this.$store.getters.board
      if (board._id) {
        const group = board.groups.find((group) => group.id === groupId)
        return group.title
      }
    },
    descriptionStyle() {
      return this.isEditDescription
        ? 'description-textarea'
        : 'description-fake-textarea'
    },
    loggedUser() {
      return this.$store.getters.user
    },
    taskLabels() {
      const labels = this.$store.getters.getLabels
      return labels.filter((label) => this.task.labelIds.includes(label.id))
    },
  },
  methods: {
    getMemberById(memberId) {
      const members = this.$store.getters.getMembers
      return members.find((member) => member._id === memberId)
    },
    saveChecklists(checklists) {
      this.task.checklists = checklists
      this.updateTask('Updated checklist in card ')
    },
    addUserToTask() {
      if (!this.task.memberIds)
        this.task.memberIds = [userService.getLoggedInUser()._id]
      else this.task.memberIds.push(userService.getLoggedInUser()._id)
      this.updateTask('Joined to card ')
    },
    updateTask(activityTxt) {
      this.$store.dispatch({
        type: 'saveTask',
        task: JSON.parse(JSON.stringify(this.task)),
        groupId: this.task.groupId,
        activityTxt: activityTxt + this.task.title,
      })
    },
    toggleDate(ev) {
      if (!ev) {
        this.isDate = !this.isDate
        return
      }
      this.modalPos.left = ev?.clientX - 200 + 'px'
      this.modalPos.top = ev?.clientY - 250 + 'px'
      this.isDate = !this.isDate
    },
    openPicker(elData) {
      // TODO: calculate from client and adjust modal
      const { top, right, height, width } = elData.el.getBoundingClientRect()
      this.modalPos = {
        top: top + height + 5 + 'px',
        left: right - width + 'px',
      }
      this.modalCmpType = elData.type
      this.isPickerCmpOpen = true
    },
    updateDueDate(dueDate) {
      this.dueDate = dueDate
      const timestamp = dueDate.getTime()
      this.task.dueDate = ref(timestamp)
      this.isDate = false
      this.updateTask('Updated the due date of card ')
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
      const activityTxt = this.task.status === 'in-progress' ? 'Un marked' : 'Marked as done'
      this.updateTask(activityTxt + ' card ')
    },
    removeAttachment(attachId) {
      const attachIdx = this.task.attachments.findIndex(
        (attach) => attach.id === attachId
      )
      this.task.attachments.splice(attachIdx, 1)
      this.updateTask('Deleted an attachment from card ')
    },
    removeTask() {
      const { boardId, taskId, groupId } = this.$route.params
      this.$store.dispatch({ type: 'removeTask', taskId, groupId })
      this.$router.push('/board/' + boardId)
    },
    removeDueDate() {
      this.task.dueDate = ''
      this.task.status = 'in-progress'
      this.isDate = false
      this.updateTask('Deleted a due date from card ')
    },
    backToBoard() {
      this.$router.push('/board/' + this.$route.params.boardId)
    },
    updateCurrCover(cover) {
      this.task.style.background = cover
      this.currCover = { background: cover }
      this.updateTask('Updated the cover of card ')
    },

    saveComment(comment) {
      comment.id = utilService.makeId()
      comment.byMember = {
        id: this.loggedUser.id,
        fullname: this.loggedUser.fullname,
        imgUrl: this.loggedUser.imgUrl,
      }
      comment.createdAt = Date.now()
      this.task.comments.unshift(comment)
      this.updateTask('Added a comment to card ')
    },
    deleteComment(commentId) {
      console.log('hi')
      const idx = this.task.comments.findIndex(
        (comment) => comment.id === commentId
      )
      if (idx !== -1) this.task.comments.splice(idx, 1)
      this.updateTask('Deleted a comment from card ')
    },
    saveDescription(newDescription) {
      this.task.description = newDescription
      this.updateTask('Updated the description of card ')
    },
  },
  components: {
    attachmentList,
    avatarPreview,
    coverBg,
    labelPrev,
    datePicker,
    date,
    taskDetailSidebar,
    checklistList,
    taskComment,
    taskOptions,
    taskDescription,
    memberPrev
  },
}
</script>
