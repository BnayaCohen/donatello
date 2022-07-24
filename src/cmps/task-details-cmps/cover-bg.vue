<template>
  <div
    v-if="task.style?.background"
    class="flex justify-center task-detail-bg"
    :style="task.style"
  ></div>
  <div class="btn-wrapper" v-if="task.style?.background">
    <button @click.stop="coverClicked" class="cover-btn flex align-center">
      <span class="trellicons trellicons-cover cover-icon"></span>
      <span class="cover-txt">Cover</span>
    </button>
  </div>
  <button class="close-modal-btn" @click.stop="$emit('closeModal')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256px"
      height="256px"
      viewBox="0 0 256 256"
      id="Flat"
    >
      <path
        d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"
      />
    </svg>
  </button>
</template>
<script>
export default {
  props: {
    task: Object,
  },
  created() {},
  methods: {
    coverClicked(ev) {
      this.$emit('coverClicked', ev)
    },
  },
  emits: ['coverClicked', 'closeModal']
}
</script>
<style></style>
