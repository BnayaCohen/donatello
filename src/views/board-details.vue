<template>
    <main class="main-layout board-container">
        <board-header v-if="board" :board="board" />
        <board-side-bar v-if="board" :activities="activities" />
        <group-list v-if="board" :groups="groups" @add-task="addTask" />
    </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
import boardSideBar from '../cmps/board-side-bar.vue'
import BoardSideBar from '../cmps/board-side-bar.vue'

export default {
    name: 'board-details',
    data() {
        return {
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    computed: {
        groups() {
            return this.board.groups
        },
        activities() {
            return this.board.activities
        },
        board() {
            return this.$store.getters.board
        }
    },
    methods: {
        addTask(groupId) {
            console.log(groupId)
        }
    },
    components: {
        groupList,
        boardHeader,
        boardSideBar,
    }
}
</script>