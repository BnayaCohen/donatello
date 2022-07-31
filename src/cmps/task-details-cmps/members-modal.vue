<template>
  <div class="dynamic-popover members-popover-container">
    <div class="popover-header flex justify-center align-center">
      <span class="modal-title">Members</span>
      <button class="pop-close-btn">
        <span class="close-btn trellicons trellicons-close-btn" @click="$emit('modalClosed')"></span>
      </button>
    </div>
    <div class="popover-content">
      <input @input="filterMembers" type="text" placeholder="Search members" class="basic-input modal-input" />
      <h4 class="small-title">Board members</h4>
      <div v-if="loading" class="loading skeleton"></div>
      <div v-if="!members.length" class="no-results">
        <p style="padding: 24px 6px">No results</p>
      </div>
      <section class="member-list">
        <div v-for="member in members" :key="member.id" class="member-preview flex member-preview align-center"
          @click="$emit('taskUpdated', member._id)">
          <avatar-preview :member="member" :avatarSize="'small'" />
          <p class="member-fullname">{{ member.fullname }}</p>
          <span v-if="memberIds.find(m => m === member._id)" class="trellicons trellicons-v-check"
            :style="{ position: 'absolute', right: '23px' }"></span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import avatarPreview from '../avatar-preview.vue'
export default {
  components: { avatarPreview },
  props: { memberIds: Array },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    members() {
      console.log(this.$store.getters.getMembers);
      return this.$store.getters.getMembers
    },
  },
  methods: {
    filterMembers() { },
  },
  emits: ['modalClosed', 'taskUpdated'],
}
</script>