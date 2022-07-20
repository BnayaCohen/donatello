<template>
    <section class="group-list-container">
<<<<<<< HEAD
        <group-preview v-for="(group, i) in groups" :group="group" :key="i" @add-task="addTask"/>
=======
        <group-preview v-for="(group, i) in groups" :group="group" :key="i"/>
        <article class="new-group">
            <group-preview :group="{}"/>
        </article>
>>>>>>> 1dd4edf68322cb7005da766e91f5009de8037798
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