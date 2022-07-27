<template>
    <div v-if="task" class="quick-card-editor">
        <span @click="$emit('closeQuickEdit')"
            class="icon-lg icon-close quick-card-editor-close-icon trellicons trellicons-close-btn">
        </span>
        <div :style="getCords" class="quick-card-editor-card">
            <div :style="task.styles" class="list-card list-card-quick-edit is-covered">
                <!-- Add cover image/background to display in quick edit -->
                <div class="list-card-details">
                    <div v-if="task.labelIds.length" class="list-card-labels">
                        <task-label-list :labelIds="task.labelIds" />
                    </div>
                    <textarea v-model="taskToEdit.title" data-autosize="true" dir="auto" style="
              overflow: hidden;
              overflow-wrap: break-word;
              resize: none;
              height: 90px;
            "></textarea>
                    <div class="badges">
                        <span class="badges-container">
                            <div v-if="task.description" class="task-indicator trellicons trellicons-description badge">
                            </div>
                            <div v-if="task.dueDate" class="task-due-date badge" @mouseenter="toggleDueDateOnHover"
                                @mouseleave="toggleDueDateOnHover" @click="toggleDueDateCheck" :style="dueDateStyle">
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
            <button class="save-task-btn text-center">Save</button>
            <div class="quick-card-editor-buttons fade-in">
                <span class="quick-card-editor-buttons-item" @click="openTask(task.groupId, task.id)">
                    <span class="icon-sm icon-card"><i class="fa-solid fa-inbox"></i></span><span
                        class="quick-card-editor-buttons-item-text">Open card</span>
                </span>
                <span class="quick-card-editor-buttons-item"><span class="icon-sm icon-label"><i
                            class="fa-solid fa-tag"></i></span><span class="quick-card-editor-buttons-item-text">Edit
                        Labels</span></span>
                <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-member"><i class="fa-regular fa-user"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Change members</span></span>
                <span class="quick-card-editor-buttons-item"><span class="icon-sm icon-card-cover"><i
                            class="fa-solid fa-inbox"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Change cover</span></span>
                <!-- <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-move"><i class="fa-solid fa-arrow-right"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Move</span>
                </span>
                <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-card"><i class="fa-solid fa-inbox"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Copy</span>
                </span> -->
                <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-clock"><i class="fa-regular fa-clock"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Edit dates</span>
                </span>
                <span class="quick-card-editor-buttons-item">
                    <span class="icon-sm icon-archive"><i class="fa-solid fa-box-archive"></i></span>
                    <span class="quick-card-editor-buttons-item-text">Archive</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import taskLabelList from './task-label-list.vue'
import avatarPreview from './avatar-preview.vue'
export default {
    props: { task: Object, getCords: Object },
    name: 'quickEdit',
    components: { avatarPreview, taskLabelList },
    data() {
        return {
            onDueDateHover: false,
            taskToEdit: this.task
        }
    },
    methods: {
        openTask(groupId, taskId) {
            this.closeQuickEdit()
            this.$router.push(
                this.$router.currentRoute._value.path + `/${groupId}/${taskId}`
            )
        },
        getMemberById(memberId) {
            const members = this.$store.getters.getMembers
            return members.find((member) => member._id === memberId)
        },
        toggleDueDateOnHover() {
            this.onDueDateHover = !this.onDueDateHover
        },
        toggleDueDateCheck() {
            this.task.status = this.task.status === 'in-progress' ? 'done' : 'in-progress'
        },
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
            return (new Date(this.task.dueDate) + '').slice(4, 10)
        },
        dueDateStyle() {
            return {
                backgroundColor:
                    this.task.status === 'in-progress'
                        ? Date.now() - this.task.dueDate > 0
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
                    Date.now() - this.task.dueDate > 0 ||
                        this.task.status !== 'in-progress'
                        ? '#fff'
                        : '#5e6c84',
            }
        },
        getDueDateIconName() {
            const currCheckbox =
                this.task.status === 'in-progress' ? 'un-checkedbox' : 'checkedbox'
            return this.onDueDateHover ? currCheckbox : 'clock'
        },
    }
}
</script>
