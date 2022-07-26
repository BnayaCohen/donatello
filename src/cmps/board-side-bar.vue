<template>
    <section class="board-side-bar flex flex-column align-center" :class="isOpen">
        <header class="flex">
            <button class="side-bar-go-back close-btn trellicons trellicons-back" @click="goBack"
                :style="backBtnPos"></button>
            <span class="side-bar-title">{{ currHeader }}</span>
            <button class="close-side-bar close-btn trellicons trellicons-close-btn"
                @click="$emit('sideBarClosed')"></button>
        </header>
        <hr class="side-header-hr">
        <main v-if="!isChangeBgClicked" style="margin-left: 12px;">
            <section class="side-bar-options">
                <ul class="clean-list">
                    <li class="flex" @click="isChangeBgClicked = true; currHeader = 'Change background'">
                        <div class="bg-placeholder" :style="boardStyle"></div>
                        Change background
                    </li>
                </ul>
            </section>
            <hr class="side-header-hr pos-absolute">
            <section class="side-bar-activities main-side-bar-content">
                <div class="activities-title flex">
                    <span class="trellicons trellicons-activities"></span>
                    <p>Activity</p>
                </div>
                <ul class="clean-list">
                    <activity-preview v-for="activity in activities" :key="activity?.id" :activity="activity" />
                </ul>
            </section>
        </main>
        <main v-else-if="!isOnBackgroundSelect">
            <section class="side-bar-options">
                <section class="background-change-select flex">
                    <div @click="goToBackgrounds('Photos')">
                        <img src="http://res.cloudinary.com/donatello-cloud/image/upload/v1659247962/background-photos-sidebar_jvaxom.jpg"
                            alt="Photos" class="bg-item-select">
                        <p>Photos</p>
                    </div>
                    <div @click="goToBackgrounds('Colors')">
                        <img src="http://res.cloudinary.com/donatello-cloud/image/upload/v1659247853/background-color-sidebar_jbbmbx.jpg"
                            alt="Colors" class="bg-item-select">
                        <p>Colors</p>
                    </div>
                </section>
            </section>
        </main>
        <main v-else-if="currHeader === 'Colors'" class="bg-items-select">
            <div v-for="(bgColor, i) in bgColors" :key="i" class="bg-item-select" :style="'background:' + bgColor"
                @click="setBoardBg(bgColor)">
            </div>
        </main>
        <main v-else class="bg-items-select">
            <div class="search-photos-input">
                <span class="trellicons trellicons-search"></span>
                <input type="text" v-model="searchPhoto" placeholder="Photos" class="clean-input"
                    @input="unsplashPhotos" />
            </div>

            <div v-for="(bgPhoto, i) in currPhotos" :key="i" class="bg-item-select"
                :style="`background:url(${bgPhoto.thumb}) no-repeat center center/cover`"
                @click="setBoardBg(bgPhoto.full)">
            </div>
        </main>
    </section>
</template>
<script>
import activityPreview from '../cmps/activity-preview.vue'
import Axios from 'axios'

export default {
    name: 'board-side-bar',
    props: {
        activities: Array,
        isSideBarOpen: Boolean
    },
    data() {
        return {
            isOnBackgroundSelect: false,
            isChangeBgClicked: false,
            currHeader: 'Menu',
            searchPhoto: '',
            currPhotos: [],
        }
    },
    methods: {
        goToBackgrounds(header) {
            this.isOnBackgroundSelect = true
            this.currHeader = header
        },
        goBack() {
            if (this.currHeader === 'Colors' || this.currHeader === 'Photos') {
                this.isOnBackgroundSelect = false
                this.currHeader = 'Change background'
            } else {
                this.isChangeBgClicked = false
                this.currHeader = 'Menu'
            }
        },
        setBoardBg(selectedBg) {
            const currBoard = this.$store.getters.board
            currBoard.style.background = selectedBg
            this.$store.commit({ type: 'setBoard', board: currBoard })
            this.$store.dispatch({ type: 'saveBoard', board: currBoard })
        },
        async unsplashPhotos() {
            const ACCESS_KEY = 'WpMt7KfY0FhRPZe_gPbcr3XltzyDXQURaEGcBWBfoRE'
            const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${this.searchPhoto}&client_id=${ACCESS_KEY}`)
            const photoUrls = res.data.results.map(photo => ({ thumb: photo.urls.thumb, full: photo.urls.full }))
            this.currPhotos = photoUrls
        },
    },
    computed: {
        isOpen() {
            return { opened: this.isSideBarOpen }
        },
        bgColors() {
            return ['#0079bf', '#d29034', '#519839'
                , '#b04632', '#89609e', '#cd5a91'
                , '#4bbf6b', '#00aecc', '#838c91']
        },
        backBtnPos() {
            if (this.isChangeBgClicked)
                return { transform: 'translateX(48px)', opacity: 1, pointerEvents: 'all' }
        },
        boardStyle() {
            const boardBg = this.$store.getters.board.style?.background
            return { background: boardBg?.length < 10 ? boardBg : `url(${boardBg}) no-repeat center center/cover` }
        }
    },
    created() {
    },
    components: {
        activityPreview
    }
}
</script>