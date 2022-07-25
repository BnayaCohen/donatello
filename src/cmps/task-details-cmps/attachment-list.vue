<template>
    <section class="attachments-container">
        <div class="attachment-header flex align-center">
            <span class="trellicons trellicons-attachment"></span>
            <h3>Attachments</h3>
        </div>
        <attachment-preview v-for="attachment in attachments" :key="attachment.id" :attachment="attachment"
            @updateCurrCover="$emit('updateCurrCover', $event)" />
    </section>
</template>
<script>
import attachmentPreview from '@/cmps/task-details-cmps/attachment-preview.vue'

export default {
    props: {
        attachments: Object,
    },
    methods: {
    },
    emits: ['updateCurrCover'],
    components: {
        attachmentPreview,
    }
}
</script>
<style>
</style>
