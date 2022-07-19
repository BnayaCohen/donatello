<template>
    <section class="container task-list">
        <task-preview v-for="task in tasks" :key = task.id :task="task" />
    </section>
</template>
<script>
import taskPreview from './task-preview.vue'
export default {
    name: 'taskList',
    props: {
        tasks: {
            type: Array
        }
    },
    data() {
        return {
        }
    },
    created() {},
    components: {taskPreview}
}
</script>
<style>
    
</style>