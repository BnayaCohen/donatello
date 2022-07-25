<template>
    <section @click.stop="''" class="users-modal">
        <header class="modal-header">
            <span>Invite to board</span>
            <span @click.stop="$emit('toggleInvite')" class="close-btn trellicons trellicons-close-btn"></span>
        </header>
        <div class="modal-content"></div>
        <input @input="getUsers" v-model="txt" type="text" placeholder="Search users" class="modal-input">
        <div v-if="loading" class="loading skeleton"></div>
        <div v-if="!users || !users.length" class="no-results">
            <p style="padding:24px 6px;">No results</p>
        </div>
        <section class="user-list">
            <div v-for="user in users" class="user-preview flex">
                <div @click="$emit('toggleUser', user._id)" class="user-avatar" :style="`background:${user.imgUrl}`">
                </div>
                <p>{{ user.fullname }}</p>
                <span v-if="board.members.find(m => m === user._id)" class="trellicons trellicons-check"></span>
            </div>
        </section>
    </section>
</template>

<script>
import { utilService } from '../services/util-service'

export default {
    data() {
        return {
            txt: '',
            loading: false,
        }
    },
    created() {
        this.getUsers = utilService.debounce(this.getUsers)
        this.$store.dispatch({ type: 'getUsers', filterBy: this.txt })
    },
    methods: {
        getUsers() {
            this.$store.dispatch({ type: 'getUsers', filterBy: this.txt })
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        users() {
            return this.$store.getters.users
        }
    },
}
</script>
