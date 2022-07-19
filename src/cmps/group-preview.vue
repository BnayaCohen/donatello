<template>
    <article class="group-container">
        <div class="flex justify-between">
        <input class="group-title-input" type="text" v-model="groupTitle" placeholder="Enter group title...">
        <button class="group-options">...</button>
        </div>
        <task-list :tasks="group.tasks" />
        <button class="add-card-btn">+ Add a card</button>
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
    data() {
        return {
            groupTitle: this.group.title
        }
    },
    methods: {
    },
    components: {
        taskList,
    }
}
</script>
