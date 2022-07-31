<template>
    <section class="attachments-container">
        <div class="attachment-header flex align-center">
            <span class="trellicons trellicons-attachment"></span>
            <h3>Attachments</h3>
        </div>
        <attachment-preview v-for="attachment in attachments" :key="attachment.id" :attachment="attachment"
            @updateCurrCover="$emit('updateCurrCover', $event)" @removeAttachment="$emit('removeAttachment', $event)" />
        <div>
            <button class="add-attach-btn btn-background"
                @click="$emit('toggle', { el: $event.target.closest('button'), type: 'attachments' })">
                Add an attachment</button>
        </div>
    </section>
</template>
<script>
import attachmentPreview from '@/cmps/task-details-cmps/attachment-preview.vue'
import attachmentPicker from '@/cmps/task-details-cmps/attachment-picker.vue'

export default {
    props: {
        attachments: Object,
    },
    emits: ['updateCurrCover', 'toggle'],
    components: {
        attachmentPreview,
        attachmentPicker
    }
}
</script>