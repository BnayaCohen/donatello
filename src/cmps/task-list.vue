<template>
  <Container
    drag-class="card-ghost"
    drop-class="card-ghost-drop"
    class="flex-grow tasks-scrollbar overflow-y-auto overflow-x-hidden"
    orientation="vertical"
    group-name="col-items"
    :drop-placeholder="dropPlaceHolderOptions"
    :shouldAcceptDrop="
      (e, payload) => e.groupName === 'col-items' && !payload?.loading
    "
    :get-child-payload="getCardPayload(groupId)"
    @drop="(e) => onCardDrop(groupId, e)"
  >
    <Draggable v-for="task in tasks" :key="task.id">
      <task-preview :task="task" />
    </Draggable>
  </Container>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/util-service'
import taskPreview from './task-preview.vue'
import taskDetails from '../views/task-details.vue'
export default {
  name: 'taskList',
  props: {
    tasks: {
      type: Array,
    },
    groupId: String,
  },
  data() {
    return {
      isTaskDetail: false,
      items: [],
    }
  },
  computed: {
    dropPlaceHolderOptions() {
      return {
        className: 'drop-preview',
        animationDuration: '188',
        showOnTop: false,
      }
    },
    scene() {
      return this.$store.getters.scene
    },
  },
  methods: {
    onCardDrop(groupId, dropResult) {
      const { removedIndex, addedIndex } = dropResult
      // check if element where ADDED or REMOVED in current collumn
      if (
        (removedIndex !== null && removedIndex !== addedIndex) ||
        (addedIndex !== null && removedIndex !== addedIndex)
      ) {
        const scene = Object.assign({}, this.scene)
        const group = scene.children.find((p) => p.id === groupId)
        const itemIndex = scene.children.indexOf(group)
        const newColumn = Object.assign({}, group)
        // check if element was ADDED in current group
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          // simulate api call
          dropResult.payload.groupId = groupId
          // setTimeout(function () {
          //   dropResult.payload.loading = false
          // }, Math.random() * 5000 + 1000)
        }

        newColumn.tasks = applyDrag(newColumn.tasks, dropResult)
        // TODO:store call
        this.$store.dispatch({
          type: 'updateGroups',
          itemIndex,
          newColumn: JSON.parse(JSON.stringify(newColumn)),
        })
        scene.children.splice(itemIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload(groupId) {
      return (index) => {
        return this.scene.children.find((p) => p.id === groupId).tasks[index]
      }
    },
  },
  components: { taskPreview, taskDetails, Container, Draggable },
}
</script>
<style>
.smooth-dnd-container {
  min-height: 1px;
}
</style>
