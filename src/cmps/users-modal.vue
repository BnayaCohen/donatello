<template>
  <section @click.stop="''" class="dynamic-popover pos-absolute members-popover-container">
    <header class="popover-header flex justify-center align-center">
      <span class="modal-title">Invite to board</span>
      <span @click.stop="$emit('toggleInvite')" class="pop-close-btn trellicons trellicons-close-btn"></span>
    </header>
    <div class="popover-content"></div>
    <input @input="getUsers" v-model="txt" type="text" placeholder="Search users" class="modal-input" />
    <div v-if="loading" class="loading skeleton"></div>
    <!-- TODO: add skeleton loading -->
    <div v-if="!users || !users.length" class="no-results">
      <p style="padding: 24px 6px">No results</p>
    </div>
    <section class="member-list">
      <div v-for="user in users" :key="user.id" class="member-preview flex align-center"
        @click="$emit('toggleUser', user)">
        <avatar-preview :member="user" :avatarSize="'small'" />
        <p class="member-fullname">{{ user.fullname }}</p>
        <span class="member-username">({{ user.username }})</span>
        <span v-if="members.find(m => m._id === user._id)" class="trellicons trellicons-v-check"
          :style="{ position: 'absolute', right: '23px' }"></span>
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
    },
  },
  computed: {
    members() {
      return this.$store.getters.getMembers
    },
    users() {
      return this.$store.getters.users
    },
  },
  components: { AvatarPreview },
}
</script>
