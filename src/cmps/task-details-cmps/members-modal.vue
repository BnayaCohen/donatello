<template>
  <div
    class="dynamic-popover pos-absolute members-popover-container"
    :style="pos"
  >
    <div class="popover-header flex justify-center align-center">
      <span class="modal-title">Members</span>
      <button class="pop-close-btn">
          <span class="close-btn trellicons trellicons-close-btn" @click="$emit('toggle', { ev: $event, type: 'Memberlist' })"></span>
      </button>
    </div>
    <div class="popover-content">
      <input
        @input="filterMembers"
        type="text"
        placeholder="Search members"
        class="modal-input"
      />
      <h4 class="small-title">Board members</h4>
      <div v-if="loading" class="loading skeleton"></div>
      <div v-if="!board.members.length" class="no-results">
        <p style="padding: 24px 6px">No results</p>
      </div>
      <section class="member-list">
        <div
          v-for="member in board.members"
          :key="member.id"
          class="member-preview flex member-preview align-center"
          @click="$emit('toggleMember', member._id)"
        >
          <avatar-preview :member="member" :avatarSize="'small'" />
          <p class="member-fullname">{{ member.fullname }}</p>
          <span class="member-username">({{member.username}})</span>
          <span
          v-if="false"
            class="trellicons trellicons-v-check" :style="{position: 'absolute', right: '23px'}"
          ></span>
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
    board() {
      return this.$store.getters.board
    },
  },
  methods: {
    filterMembers() {},
  },
  emits: ['toggle', 'toggleMember'],
}
</script>
<style lang="scss">
.member-modal {
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  min-height: 50px;
  width: 321px;
  z-index: 35;

  .close-btn.trellicons-close-btn {
    position: absolute;
    font-size: 1.2rem;
    right: 0;
  }

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

  .member-preview {
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
