<template>
    <section @click.stop="''" class="users-modal">
        <header class="modal-header">
            <span>Invite to board</span>
            <span @click.stop="$emit('toggleInvite')" class="close-btn trellicons trellicons-close-btn"></span>
        </header>
        <div class="modal-content"></div>
        <input @input="getUsers" v-model="txt" type="text" placeholder="Search users" class="modal-input">
        <div v-if="loading" class="loading skeleton"></div> <!-- TODO: add skeleton loading -->
        <div v-if="!users || !users.length" class="no-results">
            <p style="padding:24px 6px;">No results</p>
        </div>
        <section class="user-list">
            <!-- TODO: add member invite functionallity @click="toggleUser"-->
            <div v-for="user in users" class="user-preview flex" @click="$emit('toggleUser', user)">
                <avatar-preview :member="user" :avatarSize="'small'" />
                <p>{{ user.fullname }}</p>
                <span v-if="board.members.find(m => m === user._id)" class="trellicons trellicons-check"></span>
            </div>
        </section>
    </section>
</template>
<script>
import { utilService } from '../services/util-service'
import AvatarPreview from './avatar-preview.vue'

export default {
    emits: ['toggleUser'],
    data() {
        return {
            txt: "",
            loading: false,
        };
    },
    created() {
        this.getUsers = utilService.debounce(this.getUsers);
        this.$store.dispatch({ type: "getUsers", filterBy: this.txt });
    },
    methods: {
        getUsers() {
            this.$store.dispatch({ type: "getUsers", filterBy: this.txt });
        }
    },
    computed: {
        board() {
            return this.$store.getters.board;
        },
        users() {
            return this.$store.getters.users;
        }
    },
    components: { AvatarPreview }
}
</script>
