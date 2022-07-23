<template>
  <div class="attachment-header flex align-center">
    <span class="trellicons trellicons-attachment"></span>
    <h3>Attachments</h3>
  </div>
  <div class="flex attachment-thumbnail">
    <img class="task-image" :src="attachment.url" @click="updateCurrCover" />
    <div class="attachment-details flex flex-column">
      <span>{{ attachment.title }}</span>
      <div class="attach-actions flex">
        <span>{{ attachment.createdAt }} </span>
        <span class="attachment-option">Comment</span>
        <span class="attachment-option">Delete</span>
        <span class="attachment-option"> Edit</span>
      </div>
      <span class="trellicons trellicons-cover">Make cover</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attachment: Object,
  },
  methods: {
    updateCurrCover() {
      this.$emit('updateCurrCover', {
        backgroundColor: 'transparent',
        backgroundImage: `url(${this.attachment.url})`,
      })
    },
  },
  emits: ['updateCurrCover'],
}
</script>
<style></style>
