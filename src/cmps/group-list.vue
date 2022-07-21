<template>
  <section class="group-list-container flex">
    <Container
      class="h-full flex overflow-x-auto gap-8 p-8"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onGroupDrop($event)"
    >
      <Draggable v-for="group in groups" :group="group" :key="group.id">
        <group-preview :group="group" />
      </Draggable>
      <article class="new-group">
        <group-preview :group="newGroup" />
      </article>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/util-service'
import groupPreview from './group-preview.vue'
import { boardService } from '../services/board-service.js'

export default {
  props: {
    groups: Array,
  },
  data() {
    return {}
  },
  computed: {
    newGroup() {
      return boardService.getEmptyGroup()
    },
    scene() {
      return this.$store.getters.scene
    },
  },
  methods: {
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
