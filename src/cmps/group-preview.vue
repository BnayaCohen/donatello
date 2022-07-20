<template>
    <article v-if="group.title" class="group-container flex flex-column">
        <div class="group-header flex">
            <input class="group-title clean-input" type="text" v-model="group.title" placeholder="Enter list title..."
                @keyup.enter="updateTitle">

            <button class="group-options-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                    viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                        clip-rule="evenodd"></path>
                </svg></button>
        </div>

        <task-list :tasks="group.tasks" />
        <section class="add-task-container">
            <add-group-or-task :groupOrTask="'task'" :groupId="group.id" />
        </section>
    </article>
    <section v-else class="new-group-container">
        <section class="add-group-container">
            <add-group-or-task :groupOrTask="'group'" />
        </section>
    </section>
</template>

<script>
import taskList from '../cmps/task-list.vue'
import addGroupOrTask from '../cmps/add-group-or-task.vue'

export default {
    name: 'group-preview',
    props: {
        group: Object,
    },
    data() {
        return {
        }
    },
    methods: {
        updateTitle() {
            if (this.group.title === '') return
            this.$store.dispatch({ type: 'saveGroup', group: this.group })
        },
        addTask(groupId) {
            this.$emit('add-task', groupId)
        },
    },
    computed: {
    },
    components: {
        taskList,
        addGroupOrTask
    },
}
</script>