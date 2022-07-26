<template>
  <div class="comment-container">
    <div class="task-detail-title">
      <span class="trellicons trellicons-comments"></span>
      <h3>Activity</h3>
    </div>
    <div
      class="new-comment-container flex align-center"
      v-click-outside="closeComment"
    >
      <div class="member-icon-container">
        <img class="member-avatar-big" :src="loggedInUser.imgUrl" />
      </div>
      <form @submit.prevent="saveComment">
        <div class="comment-frame">
          <div ref="commentBox" class="comment-box">
            <textarea
              class="comment-box-input"
              placeholder="Write a comment..."
              @click="openComment"
              v-model="comment.txt"
            ></textarea>
            <div ref="commentControl" class="comment-control">
              <button class="submit-comment-btn flex align-center justify-center">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <seciton class="all-comments-container" v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id">
        <comment-preview :comment="comment" :loggedInUser="loggedInUser" @deleteComment="deleteComment"/>
      </div>
    </seciton>
  </div>
</template>
<script>
import commentPreview from './comment-preview.vue'
export default {
  props: {
    loggedInUser: Object,
    comments: Array
  },
  data() {
    return {
      comment: {
        byMember: null,
        createdAt: null,
        txt: null,
      },
    }
  },
  created() {
  },
  computed: {
    isCommentTxt() {
      // return this.comment.txt? 'enabled' : 'disabled'
    },
  },
  methods: {
    openComment() {
      this.$refs.commentBox.classList.add('focus')
      this.$refs.commentControl.classList.add('focus')
    },
    closeComment() {
      this.$refs.commentBox.classList.remove('focus')
      this.$refs.commentControl.classList.remove('focus')
    },
    saveComment() {
      if (!this.comment.txt) return
      this.$emit('saveComment', this.comment)
    },
    deleteComment(commentId) {
      this.$emit('deleteComment', commentId)
    }
  },
  components: {
    commentPreview
  },
  emits: ['saveComment', 'deleteComment']
}
</script>
<style></style>
