<template>
    <main class="board-container">
        <groupList :groups="groups" />
    </main>
</template>

<script>
import groupList from '../cmps/group-list.vue'
export default {
    name: 'board-details',
    data() {
        return {
            board: null,
            groups: [],
        }
    },
    async created() {
        const { boardId } = this.$route.params
        this.board = await this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    methods: {

    },
    components: {
        groupList,
    }
}
</script>