<template>
    <article v-if="group.title" class="group-container flex flex-column">
        <div class="group-header flex justify-between align-center">
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

        <button @click="addTask" class="add-card-btn flex align-center">
            <i class="plus-sign"><svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294"
                    viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <defs></defs>
                    <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                    <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                </svg></i>
            Add a card
        </button>
    </article>

    
    <article v-else class="add-group-container" :class="addingGroup">
        <p v-if="!isNewGroupOpen" @click="isNewGroupOpen = true" class="add-group-placeholder flex">
            <i class="plus-sign"><svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294"
                    viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <defs></defs>
                    <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                    <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                </svg></i>
            Add another list
        </p>
        <div v-else class="flex flex-column">
            <textarea class="new-group-input" type="text" placeholder="Enter list title..." v-model="newGroupTitle"
                v-focus></textarea>
            <div class="flex align-center">
                <button @click="addGroup" class="add-group-btn">Add list</button>
                <button @click="closeAddGroup" class="close-add-group"><svg stroke="currentColor" fill="currentColor"
                        stroke-width="0" viewBox="0 0 512 512" class="icon" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: rgb(66, 82, 110); font-size: 24px; display: flex; align-items: center; justify-content: center;">
                        <path
                            d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
                        </path>
                    </svg></button>
            </div>
        </div>
    </article>
</template>

<script>
import { boardService } from '../services/board-service.js'
import taskList from '../cmps/task-list.vue'
export default {
    name: 'group-preview',
    props: {
        group: Object,
    },
    data() {
        return {
            newGroupTitle: '',
            isNewGroupOpen: false,
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
        addGroup() {
            if (this.newGroupTitle === '') return
            const newGroup = boardService.getEmptyGroup()
            newGroup.title = this.newGroupTitle
            this.$store.dispatch({ type: 'saveGroup', group: newGroup })
            this.newGroupTitle = ''
        },
        closeAddGroup() {
            this.newGroupTitle = ''
            this.isNewGroupOpen = false
        }
    },
    computed: {
        addingGroup() {
            return { adding: this.isNewGroupOpen }
        }
    },
    components: {
        taskList,
    },
}
</script>