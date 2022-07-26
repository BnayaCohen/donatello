<template>
  <div class="dynamic-popover pos-absolute attachment-popover-container" :style="pos">
    <div class="popover-header flex justify-center align-center">
      <span>Attach from..</span>
      <button class="pop-close-btn" @click.stop="$emit('toggle', { ev: $event, type: 'Attach' })">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content">
      <div class="attachment-pop-over-content">
        <div class="upload-preview">
          <label for="file-upload">Computer</label><input type="file" accept="img/*" id="file-upload"
            @change="handleFile" />
        </div>
        <div class="from-web">
          <h3 class="small-title">Attach a link</h3>
          <label for="web-url">
            <input type="text" v-model="attachProps.url" />
            <button class="btn" @click="addLinkAttachment">Attach</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/services/img-upload.service';

export default {
  props: {
    pos: Object,
  },
  data() {
    return {
      attachProps: {},
    }
  },
  methods: {
    handleFile(ev) {
      console.log(ev);
      var file
      if (ev.type === "change") file = ev.target.files[0]
      else if (ev.type === "drop") file = ev.dataTransfer.files[0]
      this.onUploadFile(file)
    },
    async onUploadFile(file) {
      // this.isLoading = true
      const res = await uploadImg(file)
      // this.isLoading = false
      this.attachProps.url = res.url
      this.attachProps.title = file.name
      this.attachProps.createdAt = Date.now()
      this.$emit('attachSelected', this.attachProps)
    },
    addLinkAttachment() {
      if (!this.attachProps.url) return
      this.attachProps.title = 'Web image'
      this.attachProps.createdAt = Date.now()
      this.$emit('attachSelected', this.attachProps)
    },
  },
  emits: ['attachSelected', 'toggle'],
}
</script>
<style>
</style>
