<template>
  <section class="group-list-container flex" :style="groupListWidth">
    <Container class="h-full flex overflow-x-auto gap-8 p-8" group-name="cols" drag-class="card-ghost"
      drop-class="card-ghost-drop" :drop-placeholder="dropPlaceHolderOptions" tag="div" orientation="horizontal"
      @drop="onGroupDrop($event)">
      <Draggable v-for="group in groups" :key="group.id">
        <group-preview :group="group" @x="x" />
      </Draggable>
      <article class="new-group">
        <group-preview :group="newGroup" @x="x" />
      </article>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/util-service'
import groupPreview from './group-preview.vue'
import { boardService } from '../services/board-service.js'
import { emitChangeFn } from 'element-plus'

export default {
  props: {
    groups: Array,
    isSideBarOpen: Boolean
  },
  data() {
    return {
      scene: this.$store.getters.scene,
    }
  },
  computed: {
    newGroup() {
      return boardService.getEmptyGroup()
    },
    dropPlaceHolderOptions() {
      return {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      }
    },
    groupListWidth() {
      return {
        width: this.isSideBarOpen ? 'calc(100% - 305px)' : '100%'
      }
    }
  },
  methods: {
    x(board) {
      this.$emit('x', board)
    },
    onGroupDrop(dropResult) {
      if (dropResult.removedIndex === dropResult.addedIndex) return
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
      console.log(dropResult)
      this.$store.dispatch({ type: 'swap', dropResult })
    },
  },
  components: {
    groupPreview,
    Container,
    Draggable,
  },
}
</script>