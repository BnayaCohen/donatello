<template>
    <section class="board-side-bar flex flex-column align-center" :class="isOpen">
        <header class="flex">
            <span class="side-bar-title">Menu</span>
            <button class="close-side-bar close-btn" @click="$emit('sideBarClosed')"><svg stroke="currentColor"
                    fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style=" color: rgb(66, 82, 110);font-size: em(20px);display: flex;align-items: center;justify-content: center;">
                    <path
                        d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
                    </path>
                </svg></button>
        </header>
        <hr class="side-header-hr">
        <section class="side-bar-options">
            <ul class="clean-list">
                <li>
                    <i class="fa-regular fa-image"></i>
                    Change background
                </li>
                <li>
                    <i class="fa-solid fa-box-archive"></i>
                    Archive
                </li>
                <li>
                    <i class="fa-regular fa-trash-can"></i>
                    Delete board
                </li>
            </ul>
        </section>
        <hr class="side-header-hr">
        <section class="side-bar-activities">
            <div class="activities-title flex">
                <!-- <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em"
                    width="1.2em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"
                        d="M9,6 L21,6 M9,12 L21,12 M9,18 L17,18 M4,7 C4.55228475,7 5,6.55228475 5,6 C5,5.44771525 4.55228475,5 4,5 C3.44771525,5 3,5.44771525 3,6 C3,6.55228475 3.44771525,7 4,7 Z M4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 Z M4,19 C4.55228475,19 5,18.5522847 5,18 C5,17.4477153 4.55228475,17 4,17 C3.44771525,17 3,17.4477153 3,18 C3,18.5522847 3.44771525,19 4,19 Z">
                    </path>
                </svg> -->
                <p>Activities</p>
            </div>
            <ul class="clean-list">
                <activity-preview v-for="activity in activities" :key="activity?.id" :activity="activity" />
            </ul>
        </section>
    </section>
</template>
<script>
import activityPreview from '../cmps/activity-preview.vue'

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
    },
    components: {
        activityPreview
    }
}
</script>
<style>
</style>
