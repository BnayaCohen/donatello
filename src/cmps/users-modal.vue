<template>
    <section class="users-modal">
        <header class="modal-header">
            <span>Invite to board</span>
            <span @click="$emit('toggleInvite')" class="close-btn trellicons trellicons-close-btn"></span>
        </header>
        <div class="modal-content"></div>
        <input @input="setFilterBy" v-model="txt" type="text" placeholder="Search users" class="modal-input">
        <div v-if="loading" class="loading skeleton"></div>
        <!-- <div v-if="!board.members.length" class="no-results">
            <p style="padding:24px 6px;">No results</p>
        </div> -->
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
        this.setFilterBy = utilService.debounce(this.setFilterBy)
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', txt)
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
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