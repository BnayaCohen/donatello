<template>
  <div
    class="new-comment-container flex align-center"
    v-click-outside="closeComment"
  >
    <div class="member-icon-container">
      <img class="member-avatar-big" :src="loggedInUser.imgUrl" />
    </div>
    <form @submit.prevent="saveComment">
      <div class="about-comment">
        <h3 class="bold">{{ comment.byMember }}</h3>
        <span>{{ timeAgo }}</span>
      </div>
      <div class="comment-frame">
        <div ref="commentBox" class="comment-box">
          <textarea
            class="comment-box-input"
            placeholder="Write a comment..."
            @click="openComment"
            v-model="comment.txt"
            disabled
            :style="{cursor: 'default'}"
          ></textarea>
          <div ref="commentControl" class="comment-control">
            <button class="submit-comment-btn flex align-center justify-center">
              Save
            </button>
          </div>
        </div>
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
}
</script>
<style></style>
