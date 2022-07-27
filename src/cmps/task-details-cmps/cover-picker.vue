<template>
  <div
    class="dynamic-popover cover-popover-container"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Cover</h4>
      <button class="pop-close-btn" @click.stop="$emit('modalClosed')">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content">
      <div class="cover-pop-over-content">
        <h3 class="small-title">Size</h3>
        <div class="cover-options flex justify-between align-center">
          <div class="header-cover-preview">
            <div
              class="header-section"
              :style="{
                background: selectedCover||'#5e6c84',
                height: '2rem',
                borderRadius: '3px',
              }"
            ></div>
          </div>
          <div
            class="full-cover-preview"
            :style="{ background: selectedCover||'#5e6c84' }"
          ></div>
        </div>
        <button v-if="selectedCover" @click.stop="selectedCover='';$emit('taskUpdated', '')" class="btn-background" style="width:100%">Remove cover</button>
        <h3 class="small-title">Color</h3>
        <div class="color-palette">
          <div v-for="color in colors" :key="color.id">
            <label
              class="flex align-center justify-center"
              name="cover-color"
              :for="'color-' + color.colorStr"
              :style="{ background: color.colorStr }"
              @click.stop="selectCover(color.colorStr)"
              ><input
                type="radio"
                name="color"
                :id="'color-' + color.colorStr"
                :value="color.colorStr"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    taskCoverClr:String,
  },
  data() {
    return {
      colors: this.$store.getters.getCoverColors,
      selectedCover: this.taskCoverClr,
    }
  },
  created() {},
  methods: {
    selectCover(color) {
      this.selectedCover = color
      this.$emit('taskUpdated', color)
    },
  },
  emits: ['taskUpdated', 'modalClosed'],
}
</script>
<style></style>
