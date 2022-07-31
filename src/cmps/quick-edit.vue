<template>
    <div v-if="task" class="quick-card-editor" @click="$emit('closeQuickEdit')">
        <span @click="$emit('closeQuickEdit')"
            class="icon-lg icon-close quick-card-editor-close-icon trellicons trellicons-close-btn">
        </span>
        <div :style="getCords" @click.stop class="quick-card-editor-card">
            <div :style="task.styles" class="list-card list-card-quick-edit is-covered">
                <!-- Add cover image/background to display in quick edit -->
                <div class="list-card-details">
                    <div v-if="task.style.background" :style="task.style" class="quick-edit-img">
                        <img v-if="task.style.background.length > 24" :src="task.style.background">
                    </div>
                    <div class="quick-edit-data" :style="setMarginTop">
                        <div v-if="task.labelIds.length" class="list-card-labels">
                            <task-label-list :labelIds="task.labelIds" />
                        </div>
                        <textarea v-model="title" data-autosize="true" dir="auto" :style="setPaddingTop" style="
              overflow: hidden;
              overflow-wrap: break-word;
              resize: none;
              height: 90px;
            "></textarea>
                        <div class="badges">
                            <span class="badges-container">
                                <div v-if="task.description"
                                    class="task-indicator trellicons trellicons-description badge">
                                </div>
                                <div v-if="task.dueDate" class="task-due-date badge" @mouseenter="toggleDueDateOnHover"
                                    @mouseleave="toggleDueDateOnHover" @click="toggleDueDateCheck"
                                    :style="dueDateStyle">
                                    <div class="due-date-icon ">
                                        <span class="trellicons" :class="'trellicons-' + getDueDateIconName"></span>
                                    </div>
                                    <p> {{ getFixedDueDate }}</p>
                                </div>
                                <div v-if="task.comments?.length" class="task-indicator badge">
                                    <span class="trellicons trellicons-comment"></span>
                                    <p> {{ task.comments.length }}</p>
                                </div>
                                <div v-if="task.attachments?.length" class="task-indicator badge">
                                    <span class="trellicons trellicons-attachment"></span>
                                    <p> {{ task.attachments.length }}</p>
                                </div>
                                <div v-if="task.checklists?.length" class="task-indicator badge">
                                    <span class="trellicons trellicons-checkedbox"></span>
                                    <p>{{ getChecklistProgress }}</p>
                                </div>
                            </span>
                        </div>
                        <div v-if="task.memberIds.length" class="list-card-members">
                            <avatar-preview v-for="memberId in task.memberIds" :key="memberId" :avatarSize="'small'"
                                :member="getMemberById(memberId)" />
                        </div>
                    </div>
                </div>
            </div>
            <button @click="save" class="save-task-btn text-center">Save</button>
            <div class="quick-card-editor-buttons fade-in">
                <!-- Open card -->
                <span class="quick-card-editor-buttons-item" @click="openTask(task.groupId, task.id)">
                    <span class="icon-sm icon-card"><i class="trellicons trellicons-details"></i></span><span
                        class="quick-card-editor-buttons-item-text">Open card</span>
                </span>
                <!-- Edit labels -->
                <span @click="openPicker($event, 'labels')" class="quick-card-editor-buttons-item"><span
                        class="icon-sm icon-label"><i class="trellicons trellicons-labels"></i></span><span
                        class="quick-card-editor-buttons-item-text">Edit
                        Labels</span></span>
                <span class="quick-card-editor-buttons-item" @click="openPicker($event, 'members')">
                    <!-- Change members -->
                    <span class="icon-sm icon-member"><i class="trellicons trellicons-member"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Change members</span>
                </span>
                <!-- Change cover -->
                <span @click="openPicker($event, 'cover')" class="quick-card-editor-buttons-item"><span
                        class="icon-sm icon-card-cover"><i class="trellicons trellicons-cover"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Change cover</span></span>
                <!-- Move -->
                <!-- <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-move"><i class="fa-solid fa-arrow-right"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Move</span>
                </span> -->
                <!-- Copy -->
                <!-- <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-card"><i class="fa-solid fa-inbox"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Copy</span>
                </span>  -->

                <!-- Edit due date -->
                <span @click="openPicker($event, 'dates')" class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-clock"><i class="trellicons trellicons-clock"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Edit dates</span>
                </span>

                <!-- Archive/Delete -->
                <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-archive"><i class="trellicons trellicons-archive"></i></span>
                    <span class="quick-card-editor-buttons-item-text"
                        @click="removeTask(task.id, task.groupId)">Archive</span>
                </span>
            </div>
        </div>
    </div>
    <task-options v-if="isPickerOpen" :cmpType="modalCmpType" :task="task" :style="modalPos" :dueDate="dueDate"
        @removeDueDate="removeDueDate" @updateDueDate="updateDueDate" @pickerClosed="isPickerOpen = false" />
</template>

<script>
import { ref } from 'vue'
import taskLabelList from './task-label-list.vue'
import avatarPreview from './avatar-preview.vue'
import taskOptions from './task-options-cmp.vue'
export default {
    created() {
        console.log(this.getCords)
    },
    props: { task: Object, getCords: Object },
    name: 'quickEdit',
    components: { avatarPreview, taskLabelList, taskOptions },
    data() {
        return {
            modaPos: {},
            isPickerOpen: false,
            onDueDateHover: false,
            taskToEdit: this.task,
            title: this.task.title,
            modalCmpType: '',
            dueDate: ref(new Date()),
            activityTxt: 'Updated card ',
        }
    },
    methods: {
        openTask(groupId, taskId) {
            this.$router.push(
                this.$router.currentRoute._value.path + `/${groupId}/${taskId}`
            )
            this.$emit('closeQuickEdit')
        },
        getMemberById(memberId) {
            const members = this.$store.getters.getMembers
            return members.find((member) => member._id === memberId)
        },
        toggleDueDateOnHover() {
            this.onDueDateHover = !this.onDueDateHover
        },
        toggleDueDateCheck() {
            if (this.taskToEdit.status === 'in-progress') {
                this.activityTxt = 'Marked due date in card '
                this.taskToEdit.status = 'done'
            } else {
                this.activityTxt = 'Un marked due date in card '
                this.taskToEdit.status = 'in-progress'
            }
        },
        updateTask(txt = this.activityTxt, close = true) {
            if (!this.taskToEdit.title) return
            this.$emit('saveTask', this.taskToEdit, txt)
            close && this.$emit('closeQuickEdit')
        },
        save() {
            if (!this.title) return
            this.taskToEdit.title = this.title
            this.$emit('saveTask', this.taskToEdit, this.activityTxt)
            this.$emit('closeQuickEdit')

        },
        removeTask(taskId, groupId) {
            this.$store.dispatch({ type: 'removeTask', taskId, groupId })
            this.$emit('closeQuickEdit')
        },
        removeDueDate() {
            this.taskToEdit.dueDate = ''
            this.taskToEdit.status = 'in-progress'
            this.updateTask('Deleted the due date in card ', false)
        },
        updateDueDate(dueDate) {
            const timestamp = dueDate.getTime()
            this.taskToEdit.dueDate = ref(timestamp)
            this.updateTask('Updated the due date in card ', false)
        },
        openPicker(ev, type) {
            const { top, right, height, width } = ev.target.closest('.quick-card-editor-buttons-item').getBoundingClientRect()
            this.modalPos = {
                top: top + height + 'px',
                left: right - width + 'px'
            }
            this.modalCmpType = type
            this.isPickerOpen = true
        }
    },
    computed: {
        getChecklistProgress() {
            const checklistCounter = this.task.checklists.reduce(
                (acc, checklist) => {
                    acc.overallTodos += checklist.todos?.length
                    acc.doneTodos += checklist.todos?.reduce((acc, todo) => {
                        if (todo?.isDone) acc++
                        return acc
                    }, 0)
                    return acc
                },
                { doneTodos: 0, overallTodos: 0 }
            )
            return checklistCounter.doneTodos + '/' + checklistCounter.overallTodos
        },
        getFixedDueDate() {
            return (new Date(this.taskToEdit.dueDate) + '').slice(4, 10)
        },
        dueDateStyle() {
            return {
                backgroundColor:
                    this.taskToEdit.status === 'in-progress'
                        ? Date.now() - this.taskToEdit.dueDate > 0
                            ? this.onDueDateHover
                                ? '#eb5a46'
                                : '#ec9488'
                            : this.onDueDateHover
                                ? '#00000014'
                                : '#00000000'
                        : this.onDueDateHover
                            ? '#519839'
                            : '#61bd4f',
                color:
                    Date.now() - this.taskToEdit.dueDate > 0 ||
                        this.taskToEdit.status !== 'in-progress'
                        ? '#fff'
                        : '#5e6c84',
            }
        },
        getDueDateIconName() {
            const currCheckbox =
                this.task.status === 'in-progress' ? 'un-checkedbox' : 'checkedbox'
            return this.onDueDateHover ? currCheckbox : 'clock'
        },
        setMarginTop() {
            const style = {}
            if (this.task.style.background?.length > 22) style.marginTop = '-8px'
            return style
        },
        setPaddingTop() {
            const style = {}
            if (!this.task.labelIds?.length && !this.task.style.background) style.paddingTop = '6px'
            return style

        }
    },
    emits: ['closeQuickEdit', 'saveTask']

}
</script>
