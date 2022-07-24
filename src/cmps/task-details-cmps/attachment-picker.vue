<template>
  <div
    ref="attachmentContainer"
    class="dynamic-popover pos-absolute attachment-popover-container"
    :style="pos"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Attach from..</h4>
      <button class="pop-close-btn" @click.stop="$emit('closeAttach')">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content">
      <div class="attachment-pop-over-content">
        <div class="upload-preview">
          <label for="file-upload">Computer</label
          ><input
            type="file"
            accept="img/*"
            id="file-upload"
            ref="fileInput"
            @input="pickFile"
          />
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
export default {
  props: {
    pos: Object,
  },
  data() {
    return {
      attachProps: null,
    }
  },
  created() {
    this.attachProps = {}
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload = (e) => {
          const url = e.target.result
          this.attachProps.url = url
          this.attachProps.title = file[0].name
          this.attachProps.createdAt = Date.now()
          this.$emit('attachSelected', this.attachProps)
        }
      }
    },
    addLinkAttachment() {
      if (!this.attachProps.url) return
      this.attachProps.title = 'Web image'
      this.attachProps.createdAt = Date.now()
      this.$emit('attachSelected', this.attachProps)
    },
  },
  emits: ['attachSelected', 'closeAttach'],
}
</script>
<style></style>
