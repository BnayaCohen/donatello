<template>
    <section class="task-labels-container">
        <task-label-preview v-for="labelId in labelIds" :key="labelId" :label="getLabelById(labelId)" />
    </section>
</template>

<script>
import taskLabelPreview from './task-label-preview.vue'

export default {
    props: {
        labelIds: Array,
    },
    data() {
        return {
            boardLabels: this.$store.getters.getLabels
        }
    },
    computed: {
    },
    methods: {
        getLabelById(labelId) {
            return this.boardLabels.find(label => label.id === labelId)
        },
    },
    components: {
        taskLabelPreview
    }
}
</script>

