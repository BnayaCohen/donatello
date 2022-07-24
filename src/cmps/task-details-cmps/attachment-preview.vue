<template>
  <div class="attachment-header flex align-center">
    <span class="trellicons trellicons-attachment"></span>
    <h3>Attachments</h3>
  </div>
  <div class="flex attachment-thumbnail">
    <img
      class="task-image"
      :src="attachment.url"
    />
    <div class="attachment-details flex flex-column">
        <div class="attach-header flex flex-column">
        <span class="attach-title">{{ attachment.title }}</span>
        <span class="attach-time-ago">{{ timeAgo }} </span>
      </div>
      <div class="flex align-center">
        <span class="trellicons trellicons-cover cover-icon"></span>
        <span class="make-cover" @click.stop="updateCurrCover">Make cover</span>
      </div>
    </div>
  </div>
</template>
<script>
import { utilService } from '../../services/util-service.js'

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
      this.$emit('updateCurrCover', {
        backgroundImage: `url(${this.attachment.url}) no-repeat center center/cover`,
      })
    },
  },
  emits: ['updateCurrCover'],
}
</script>
<style></style>
