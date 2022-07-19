<template>
    <article class="group-container">
<task-list :tasks="group.tasks" />
    </article>
</template>

<script>
import taskList from '../cmps/task-list.vue'
export default {
    name: 'group-preview',
    props: {
        group: {
            group: Object,
        },
    },
    methods: {
    },
     components: {
        taskList,
    }
}
</script>
