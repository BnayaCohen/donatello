<template>
  <div v-if="bgCover" class="flex justify-center task-detail-bg" :style="getBackground"><img :src="currCover.background"
      alt=""></div>
  <div class="btn-wrapper" v-if="bgCover">
    <button @click.stop="coverClicked" :class="darkModeClass" class="cover-btn flex align-center">
      <span class="trellicons trellicons-cover cover-icon"></span>
      <span class="cover-txt">Cover</span>
    </button>
  </div>
  <button class="close-modal-btn" @click.stop="$emit('closeModal')">
    <svg xmlns="http://www.w3.org/2000/svg" width="256px" height="256px" viewBox="0 0 256 256" id="Flat">
      <path
        d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" />
    </svg>
  </button>
</template>

<script>
import { utilService } from '@/services/util-service.js'

export default {
  props: {
    currCover: Object,
  },
  data() {
    return {
      bgCover: '',
      isDarkMode: false,
    }
  },
  methods: {
    coverClicked(ev) {
      this.$emit('toggle', { ev, type: 'Cover' })
    },
    async setCoverColor(bg) {
      if (bg.background.length > 10)
        return await utilService.getImgAvgColor(bg.background)
      else {
        return bg
      }
    },
    async updateDarkMode() {
      if (this.currCover.background.length > 10) {
        this.isDarkMode = await utilService.isDarkImg(this.currCover.background)
      }
    }
  },
  computed: {
    getBackground() {
      return { background: this.bgCover }
    },
    darkModeClass() {
      return { 'dark-theme': this.isDarkMode }
    }
  },
  watch: {
    async currCover() {
      this.bgCover = await this.setCoverColor(this.currCover)
      await this.updateDarkMode()
    }
  },
  emits: ['toggle', 'closeModal'],
}
</script>