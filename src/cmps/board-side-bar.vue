<template>
    <section class="board-side-bar">
        <nav>

        </nav>
    </section>
</template>
<script>
export default {
    name: 'board-side-bar',
    props: {
        activities: Array,
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    created(){
        console.log(this.activities);
    }
}
</script>
<style>
</style>
