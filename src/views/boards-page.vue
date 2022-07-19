<template>
    <main class="boards-container">
        <h1>BOARDS!</h1>
    </main>
</template>

<script>
export default {
    name: 'boards-container',
    data() {
        return {
            boards: null,
        }
    },
    // async created() {
    //     this.boards = await this.$store.dispatch('loadBoards')
    // },
    methods: {

    },
    components: {
    }
}
</script>