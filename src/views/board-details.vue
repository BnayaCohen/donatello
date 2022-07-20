<template>
    <main class="main-layout board-container">
        <board-header />
        <group-list v-if="board" :groups="groups" @add-task="addTask"/>
    </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
import boardHeader from '../cmps/board-header.vue'
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
        board(){
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
        boardHeader
    }
}
</script>