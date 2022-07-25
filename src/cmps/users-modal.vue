<template>
    <section class="users-modal">
        <header class="modal-header">
            <span>Invite to board</span>
            <span @click="$emit('toggleInvite')" class="close-btn trellicons trellicons-close-btn"></span>
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

<style lang="scss">
.user-modal {
    position: absolute;

    .modal-header {
        align-items: center;
        border-bottom: 1px solid #091e4221;
        color: #5e6c84;
        display: flex;
        justify-content: center;
        line-height: 40px;
        margin: 0 12px;
        padding: 0 32px;
        position: relative;
    }

    .modal-input {
        background-color: #fafbfc;
        border: none;
        border-radius: 3px;
        box-shadow: inset 0 0 0 2px #dfe1e6;
        margin: 4px 0 12px;
        outline: none;
        padding: 8px 12px;
        width: 100%;

        &:focus {
            background-color: #fff;
            border: 0 #fff;
            box-shadow: inset 0 0 0 2px #0079bf;
        }
    }

    .user-preview {
        p {
            flex: 1;
        }

        .trellicons-check {
            padding: 5px 11px 5px 5px;
            // trellicons check icon is "\e916"
        }
    }
}
</style>