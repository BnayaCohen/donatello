<template>
  <div
    ref="attachmentContainer"
    class="dynamic-popover pos-absolute attachment-popover-container"
    :style="pos"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Attach from..</h4>
      <button class="pop-close-btn" @click="$emit('closeAttach')">
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
            <input type="text" v-model="webUrl" />
            <button class="btn" @click="addLinkAttachment">
              Attach
            </button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pos: Object
  },
  data() {
    return {
      previewImage: null,
      webUrl: null
    }
  },
  created() {},
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
          this.$emit('attachSelected', this.previewImage)
        }
        reader.readAsDataURL(file[0])
      }
    },
    addLinkAttachment() {
      if (!this.webUrl) return
      this.$emit('attachSelected', this.webUrl)
    },
  },
  emits: ['attachSelected'],
}
</script>
<style></style>
