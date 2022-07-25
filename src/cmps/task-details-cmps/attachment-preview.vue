<template>
  <article class="attachment-preview flex">
    <div class="flex attachment-thumbnail">
      <img :src="attachment.url" alt="" />
    </div>

    <div class="attachment-details flex flex-column">
      <div class="attach-header flex flex-column">
        <h3 class="attach-title">{{ attachment.title }}</h3>
        <p class="attach-time-ago">{{ timeAgo }} - <span @click="$emit('removeAttachment',attachment.id)" class="attach-btn">Delete</span></p>
      </div>
      <div class="flex align-center">
        <span class="trellicons trellicons-cover cover-icon"></span>
        <p class="attach-btn make-cover-btn" @click="updateCurrCover">Make cover</p>
      </div>
    </div>
  </article>
</template>

<script>
import { utilService } from '@/services/util-service.js'

export default {
  props: {
    attachment: Object,
  },
  computed: {
    timeAgo() {
      return 'Added ' + utilService.timeAgo(this.attachment.createdAt)
    },
  },
  methods: {
    updateCurrCover() {
      this.$emit('updateCurrCover',  this.attachment.url)
    },
  },
  emits: ['updateCurrCover'],
}
</script>
<style>
</style>
