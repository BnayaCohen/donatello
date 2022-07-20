<template>
    <section class="group-list-container">
        <group-preview v-for="group in groups" :group="group" :key="group.id" />
        <!-- <article class="new-group"> -->
        <!-- <group-preview :group="newGroup" /> -->
        <!-- </article> -->



        <article @click="isNewGroupOpen=true" class="add-group-container fle align-center">
            <p v-if="!isNewGroupOpen" class="add-group-placeholder flex">
                <i class="plus-sign"><svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294"
                        viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs></defs>
                        <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                        <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                    </svg></i>
                Add another list
            </p>
            <section v-else class="flex flex-column">
                <input class="group-title clean-input" type="text" 
                    placeholder="Enter list title..." @keyup.enter="updateTitle">
                    <div>
                    <button class="add-group-btn">Add list</button>
                    <button class="close-add-group">X</button>
           </div>
           </section>
        </article>


    </section>
</template>

<script>
import groupPreview from './group-preview.vue'
import { boardService } from '../services/board-service.js'

export default {
    props: {
        groups: Array,
    },
    data(){
        return{

            isNewGroupOpen:false
        }
    },
    computed: {
        newGroup() {
            return boardService.getEmptyGroup()
        }
    },
    methods: {
    },
    components: {
        groupPreview,
    },
}
</script>