<template>
    <main class="main-layout board-container">
        <board-header />
        <group-list v-if="board" :groups="groups" />
    </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
export default {
    name: 'board-details',
    data() {
        return {
            board: null,
        }
    },
    async created() {
        const { boardId } = this.$route.params
        this.board = await this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    computed: {
        groups() {
            return this.board.groups
        }
    },
    components: {
        groupList,
        boardHeader
    }
}
</script>