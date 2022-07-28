<template>
    <section class="dynamic-task-option-container" :style="pos">
        <component 
        :is="cmpType"

        @click.stop="''"
        @modalClosed="$emit('pickerClosed')" 
        v-click-outside="()=>{$emit('pickerClosed')}"
        @taskUpdated="addToTask"

        :labelIds="task.labelIds"

        :memberIds="task.memberIds"

        :taskCoverClr="getTaskClr"

        :dueDate="dueDate"
        @removeDueDate="$emit('removeDueDate',$event)"
        @updateDueDate="$emit('updateDueDate',$event)"
    >
        </component>
    </section>
</template>

<script>
import members from '@/cmps/task-details-cmps/members-modal.vue'
import labels from '@/cmps/task-details-cmps/label-picker.vue'
import checklist from '@/cmps/task-details-cmps/checklist-modal.vue'
import dates from '@/cmps/date.vue'
import attachments from '@/cmps/task-details-cmps/attachment-picker.vue'
import cover from '@/cmps/task-details-cmps/cover-picker.vue'
import { utilService } from '../services/util-service.js'

export default {
    props: {
        task: Object,
        cmpType: String,
        dueDate: Object,
        pos:Object,
    },
    data() {
        return {
            taskToEdit: this.task,
        }
    },
    mounted() {
    console.log(this.pos);
    },
    computed: {
        getTaskClr() {
            return this.task.style.background?.length < 10 ? this.task.style.background : ''
        }
    },
    methods: {
        addToTask(data) {
            switch (this.cmpType) {
                case 'members': this.toggleMember(data)
                    break
                case 'labels': this.toggleLabel(data)
                    break
                case 'checklist': this.addChecklist(data)
                    break
                case 'attachments': this.addAttachment(data)
                    break
                case 'cover': this.addCover(data)
                    break
            }
        },
        addAttachment(attachProps) {
            const newAttachment = attachProps
            newAttachment.id = utilService.makeId()
            this.taskToEdit.attachments.unshift(newAttachment)
            this.updateTask()
        },
        toggleLabel(labelId) {
            let currTaskLabels = this.taskToEdit.labelIds
            if (!currTaskLabels) currTaskLabels = []

            if (currTaskLabels.includes(labelId))
                currTaskLabels = currTaskLabels.filter(idx => idx !== labelId)
            else currTaskLabels.unshift(labelId)

            this.taskToEdit.labelIds = currTaskLabels
            this.updateTask()
        },
        addCover(color) {
            console.log(color);
            this.taskToEdit.style.background = color
            this.$emit('updateCurrCover',color)
            this.updateTask()
        },
        addChecklist(checklist) {
            this.taskToEdit.checklists = this.taskToEdit.checklists?.length
                ? [...this.task.checklists, checklist]
                : [checklist]
            this.updateTask()
        },
        toggleMember(memberId) {

            let currMemberIds = this.taskToEdit.memberIds
            if (!currMemberIds) currMemberIds = []

            if (currMemberIds.includes(memberId))
                currMemberIds = currMemberIds.filter(idx => idx !== memberId)
            else currMemberIds.unshift(memberId)

            this.taskToEdit.memberIds = currMemberIds
            this.updateTask()
        },
        updateTask() {
            this.$store.dispatch({
                type: 'saveTask',
                task: JSON.parse(JSON.stringify(this.taskToEdit)),
                groupId: this.taskToEdit.groupId,
            })
        },
    },
     components: {
    members,
    labels,
    checklist,
    dates,
    attachments,
    cover,
  },
}
</script>