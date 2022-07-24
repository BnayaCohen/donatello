<template>
    <section class="board-side-bar flex flex-column align-center" :class="isOpen">
        <header class="flex">
            <span class="side-bar-title">{{ currHeader }}</span>
            <button class="close-side-bar close-btn trellicons trellicons-close-btn"
                @click="$emit('sideBarClosed')"></button>
        </header>
        <hr class="side-header-hr">
        <main v-if="!isOnBackgroundSelect" class="main-side-bar-content">
            <section class="side-bar-options">
                <section class="background-change-select flex">
                    <div @click="goToBackgrounds('Photos')">
                        <img src="src/assets/img/background-photos-sidebar.jpg" alt="Photos" class="bg-item-select">
                        <p>Photos</p>
                    </div>
                    <div @click="goToBackgrounds('Colors')">
                        <img src="src/assets/img/background-color-sidebar.jpg" alt="Colors" class="bg-item-select">
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
        </main>
        <main v-else-if="currHeader==='Colors'" class="bg-items-select">
            <div v-for="(bgColor, i) in bgColors" :key="i" class="bg-item-select" :style="'background-color:' + bgColor"
                @click="setBoardColor(bgColor)">
            </div>
        </main>
        <main v-else class="bg-items-select">
            <div class="search-photos-input">
                <span class="trellicons trellicons-search"></span>
                <input type="search" v-model="searchPhoto" placeholder="Photos" class="clean-input" />
            </div>
        
            <!-- <div v-for="(bgColor, i) in bgColors" :key="i" class="bg-item-select" :style="'background-color:' + bgColor"
                @click="setBoardColor(bgColor)">
            </div> -->
        </main>
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
            isOnBackgroundSelect: false,
            currHeader: 'Menu',
            searchPhoto:'',
        }
    },
    methods: {
        goToBackgrounds(header) {
            this.isOnBackgroundSelect = true
            this.currHeader = header
        },
        setBoardColor(selectedBg) {
            const currBoard = this.$store.getters.board
            currBoard.style.background = selectedBg
            this.$store.dispatch({ type: 'saveBoard', board: currBoard })
        }
    },
    computed: {
        isOpen() {
            return { opened: this.isSideBarOpen }
        },
        bgColors() {
            return ['#0079bf', '#d29034', '#519839'
                , '#b04632', '#89609e', '#cd5a91'
                , '#4bbf6b', '#00aecc', '#838c91']
        }
    },
    created() {
    },
    components: {
        activityPreview
    }
}
</script>
<style>
</style>
