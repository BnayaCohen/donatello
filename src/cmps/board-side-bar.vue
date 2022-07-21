<template>
    <section class="board-side-bar flex flex-column" :class="isOpen">
        <header class="flex">
            <span class="side-bar-title">Menu</span>
            <button class="close-side-bar close-btn" @click="$emit('sideBarClosed')"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon"
                    height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style=" color: rgb(66, 82, 110);font-size: 24px;display: flex;align-items: center;justify-content: center;">
                    <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path></svg></button>
        </header>
    </section>
</template>
<script>
export default {
    name: 'board-side-bar',
    props: {
        activities: Array,
        isSideBarOpen: Boolean
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        isOpen() {
            return { opened: this.isSideBarOpen }
        }
    },
    created() {
        console.log(this.activities);
    }
}
</script>
<style>
</style>
