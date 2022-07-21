<template>
    <section class="board-side-bar flex flex-column align-center" :class="isOpen">
        <header class="flex">
            <span class="side-bar-title">Menu</span>
            <button class="close-side-bar close-btn trellicons trellicons-close-btn"
                @click="$emit('sideBarClosed')"></button>
        </header>
        <hr class="side-header-hr">
        <section class="side-bar-options">
            <section class="background-change-select flex">
                <div>
                    <img src="src/assets/img/background-photos-sidebar.jpg" alt="Photos">
                    <p>Photos</p>
                </div>
                <div>
                    <img src="src/assets/img/background-color-sidebar.jpg" alt="Colors">
                    <p>Colors</p>
                </div>
            </section>
        </section>
        <hr class="side-header-hr">
        <section class="side-bar-options">
            <ul class="clean-list">
                <li>
                    <span class="trellicons trellicons-archive"></span>
                    Archive
                </li>
                <!-- <li>
                    <i class="fa-regular fa-trash-can"></i>
                    Delete board
                </li> -->
            </ul>
        </section>
        <hr class="side-header-hr">

        <section class="side-bar-activities">
            <div class="activities-title flex">
                <span class="trellicons trellicons-activities"></span>
                <p>Activity</p>
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
