<template>
  <div
    class="new-comment-container flex align-center"
  >
    <div class="member-icon-container">
      <img class="member-avatar-big" :src="comment.byMember.imgUrl" />
    </div>
    <form @submit.prevent="saveComment">
      <div class="about-comment">
        <h3 class="bold">{{ comment.byMember.fullname }}</h3>
        <span>{{ timeAgo }}</span>
      </div>
      <div class="comment-frame">
        <div ref="commentBox" class="comment-box">
          <textarea
            class="comment-box-input"
            placeholder="Write a comment..."
            v-model="comment.txt"
            disabled
            :style="{ cursor: 'default' }"
          ></textarea>
          <div ref="commentControl" class="comment-control">
            <button class="submit-comment-btn flex align-center justify-center">
              Save
            </button>
          </div>
        </div>
      </div>
      <div class="comment-actions">
        <!-- <span class="quiet-a edit-comment">Edit</span> -->
        <!-- <span class="dash">-</span> -->
        <span class="quiet-a delete-comment" @click.stop="deleteComment">Delete</span>
      </div>
    </form>
  </div>
</template>
<script>
import { utilService } from '../../services/util-service.js'
export default {
  props: {
    loggedInUser: Object,
    comment: Object,
  },
  created() {
    console.log(this.comment)
  },
  computed: {
    timeAgo() {
      return utilService.timeAgo(this.comment.createdAt)
    },
  },
  methods: {
    deleteComment() {
      this.$emit('deleteComment', this.comment.id)
    }
    },
  emits: ['deleteComment'],
}
</script>
<style></style>
