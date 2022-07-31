<template>
  <section class="dynamic-action-modal" @click.stop>
    <section class="create-board-modal">
      <header class="modal-header">
        <span @click="$emit('toggleModal', $event)"
          class="close-btn trellicons trellicons-close-btn"></span><span>Create Board</span>
      </header>
      <div class="modal-details">
        <div class="board-preview-wrapper">
          <div :style="setBackground" class="board-preview-container">
            <!-- <img src="@/https://skello.herokuapp.com/static/media/board-preview.25c287ae7ad9fc2da090aeeddd284374.svg" /> -->
          </div>
        </div>
        <div class="background-container">
          <span>Background</span>
          <div class="background-picker">
            <ul class="background-list clean-list flex">
              <li v-for="img in imgsStyle" class="img-container">
                <button @click="setStyle(img)"
                  :style="{ background: `url(${img.background}) no-repeat center top/cover` }"
                  class="background-select"></button>
              </li>
            </ul>
            <ul class="background-list clean-list flex">
              <li v-for="color in colorsStyle">
                <button @click="setStyle(color)" :style="color" class="background-select"></button>
              </li>
            </ul>
          </div>
          <span>Board title</span>
          <input v-focus type="text" v-model="title" class="add-board-title" />
          <button @click="addBoard" :class="[className, 'create-board-btn']">
            Create
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      style: null,
      colorsStyle: [
        { background: 'rgb(0, 158, 217)' },
        { background: 'rgb(255, 159, 26)' },
        { background: 'rgb(81, 232, 152)' },
        { background: 'rgb(237, 90, 70)' },
        { background: 'rgb(195, 119, 224)' },
        { background: 'rgb(188, 188, 188)' },
      ],
      imgsStyle: [
        {
          background: 'https://images.unsplash.com/photo-1658279165324-454de0ee3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjU4NTIyMTk3&ixlib=rb-1.2.1&q=80&w=400'
          ,
        },
        {
          background: 'https://images.unsplash.com/photo-1658302290771-e18350e6f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjU4NTIyMTk3&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          background: "https://images.unsplash.com/photo-1658242094232-0cacdec9fe55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjU4NTIyMTk3&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
          background: "https://images.unsplash.com/photo-1658250845157-403299ba4564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjU4NTIyMTk3&ixlib=rb-1.2.1&q=80&w=400",
        },
      ],
    }
  },
  methods: {
    addBoard() {
      if (!this.title || !this.style) return
      this.$emit('addBoard', { title: this.title, style: this.style })
    },
    setStyle(style) {
      this.style = style
    },

  },
  computed: {
    className() {
      return this.title && this.style ? 'filled' : ''
    },
    setBackground() {
      return this.style?.background?.length > 20 ? { background: `url(${this.style.background}) no-repeat center center/cover` } : this.style
    }
  },
}
</script>