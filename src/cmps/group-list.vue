<template>
    <section class="group-list-container">
        <group-preview v-for="(group, i) in groups" :group="group" :key="i"/>
        <article class="new-group">
            <group-preview :group="{}"/>
        </article>
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