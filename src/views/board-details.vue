<template>
<<<<<<< HEAD
=======
    <main class="board-container">
        <groupList :groups="groups" />
    </main>
>>>>>>> e86bd9cdd024dea6cba1d2629d2742f7b789f07e
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
        this.board = await this.$store.dispatch({ type: 'getBoardById', boardId })
    },
    methods: {

    },
    components: {
        groupList,
    }
}
</script>