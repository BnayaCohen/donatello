<template>
    <section class="group-list-container">
        <group-preview v-for="(group, i) in groups" :group="group" :key="i" @add-task="addTask"/>
    </section>
</template>

<script>
import groupPreview from './group-preview.vue'

export default {
    props: {
        groups: Array,
    },
    created() {
        
    },
    methods: {
        addTask(groupId) {
            this.$emit('add-task', groupId)
        }
    },
    components: {
        groupPreview,
    },
}
</script>