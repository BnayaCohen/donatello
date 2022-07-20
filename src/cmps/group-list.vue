<template>
    <section class="group-list-container flex">
        <group-preview v-for="group in groups" :group="group" :key="group.id" />

        <article class="new-group">
            <group-preview :group="newGroup" />
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
    data() {
        return {
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