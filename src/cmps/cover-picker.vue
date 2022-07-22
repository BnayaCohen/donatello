<template>
  <button class="sidebar-btn flex align-center" @click="toggleCover">
    <span class="trellicons trellicons-cover"></span>
    <span>Cover</span>
  </button>

  <div
    ref="coverOpts"
    class="dynamic-popover pos-absolute cover-popover-container"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Cover</h4>
      <button class="pop-close-btn" @click="toggleCover">
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
          <div v-for="label in labels" :key="label.id">
            <label
              class="flex align-center justify-center"
              name="label-color"
              :for="'color-' + label.color"
              :style="{ backgroundColor: label.color }"
              ><input
                type="radio"
                name="color"
                :id="'color-' + label.color"
                :value="label.color"
                @click="selectCover(label.color)"
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
    labels: Array,
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
