<template>
  <button class="sidebar-btn flex align-center" @click="toggleLabels">
    <span class="trellicons trellicons-labels"></span>
    <span>Labels</span>
  </button>

  <div ref="labelOpts" class="dynamic-popover pos-absolute">
    <div class="popover-header flex justify-center align-center">
      <h4>Labels</h4>
      <button class="pop-close-btn" @click="toggleLabels">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content label-list-container">
      <div class="search-labels">
        <input type="text" placeholder="Search labels..." />
      </div>
      <h3 class="small-title">Labels</h3>
      <ul class="clean-list">
        <li
          v-for="label in labels"
          :key="label.id"
          @click="addLabel(label.id)"
          class="label flex align-center"
        >
          <div
            :style="{
              borderRadius: '3px',
              width: '100%',
              height: '32px',
              backgroundColor: label.color,
            }"
          ></div>
          <span class="pos-absolute">{{ label.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    labels: Array,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    addLabel(labelId) {
      this.$emit('addLabel', labelId)
    },
    toggleLabels() {
      const elLabels = this.$refs.labelOpts
      elLabels.classList.toggle('show')
      console.log(this.labels)
    },
  },
}
</script>
<style></style>
