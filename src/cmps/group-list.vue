<template>
  <section class="group-list-container flex">
    <Container
      class="h-full flex overflow-x-auto gap-8 p-8"
      group-name="cols"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceHolderOptions"
      tag="div"
      orientation="horizontal"
      @drop="onGroupDrop($event)"
    >
      <Draggable v-for="group in groups" :key="group.id">
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
        showOnTop: false,
      }
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
<style>
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}
.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.drop-preview-card,
.drop-preview {
  background-color: rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  width: 100%;
}
.drop-preview-card {
  height: 100%;
}

.smooth-dnd-container.horizontal {
  display: flex;
}
.smooth-dnd-container.horizontal > .smooth-dnd-draggable-wrapper {
  display: flex;
  height: fit-content;
}
</style>
