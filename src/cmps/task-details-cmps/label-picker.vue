<template>
  <div class="dynamic-popover pos-absolute" :style="pos">
    <div class="popover-header flex justify-center align-center">
      <h4>Labels</h4>
      <button class="pop-close-btn" @click="$emit('closeLabels')">
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
          >
            <span
              v-if="isLabelInUse(label.id)"
              class="trellicons trellicons-v-check"
              :style="{
                float: 'right',
                color: '#fff',
                margin: '7px 7px 0 0',
                fontWeight: '400',
              }"
            ></span>
          </div>
          <span class="pos-absolute">{{ label.title }}</span>
        </li>
        <div class="label-create">
          <button class="full-btn">Create a new label</button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    labels: Array,
    taskLabels: Array,
    pos: Object
  },
  data() {
    return {}
  },
  created() {
    console.log(this.pos)
  },
  computed: {
    selectedLabel() {
      this.taskLabels.forEach((taskLabel) => {
        if (taskLabel.id === labelId) return 'label-selected'
        else return ''
      })
    },
  },
  methods: {
    isLabelInUse(labelId) {
      let inUse = false
      this.taskLabels.forEach((taskLabel) => {
        if (labelId === taskLabel.id) {
          inUse = true
        }
      })
      return inUse
    },
    addLabel(labelId) {
      this.$emit('addLabel', labelId)
    },
  },
  emits: ['addLabel'],
}
</script>
<style></style>
