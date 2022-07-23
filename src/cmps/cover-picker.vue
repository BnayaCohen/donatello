<template>
  <div
    class="dynamic-popover pos-absolute cover-popover-container"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Cover</h4>
      <button class="pop-close-btn" @click="$emit('closeCover')">
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
                backgroundColor: selectedCover,
                height: '2rem',
                borderRadius: '3px',
              }"
            ></div>
          </div>
          <div
            class="full-cover-preview"
            :style="{ backgroundColor: selectedCover }"
          ></div>
        </div>
        <h3 class="small-title">Color</h3>
        <div class="color-palette">
          <div v-for="color in colors" :key="color.id">
            <label
              class="flex align-center justify-center"
              name="cover-color"
              :for="'color-' + color.colorStr"
              :style="{ backgroundColor: color.colorStr }"
              ><input
                type="radio"
                name="color"
                :id="'color-' + color.colorStr"
                :value="color.colorStr"
                @click="selectCover(color.colorStr)"
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
    colors: Array,
  },
  data() {
    return {
      selectedCover: '#5e6c84',
    }
  },
  created() {},
  methods: {
    selectCover(color) {
      this.selectedCover = color
      this.$emit('addCover', color)
    },
    toggleCover() {
      const elCover = this.$refs.coverOpts
      elCover.classList.toggle('show')
    },
  },
  emits: ['addCover'],
}
</script>
<style></style>
