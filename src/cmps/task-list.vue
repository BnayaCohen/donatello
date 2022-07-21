<template>
  <ul class="container clean-list task-list">
    <Container
      class="flex-grow overflow-y-auto overflow-x-hidden"
      orientation="vertical"
      :shouldAcceptDrop="
        (e, payload) => e.groupName === 'col-items' && !payload.loading
      "
      :get-child-payload="getCardPayload(groupId)"
      @drop="(e) => onCardDrop(groupId, e)"
    >
      <task-preview v-for="task in tasks" :key="task.id" :task="task" />
    </Container>
  </ul>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
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
  methods: {
    onCardDrop(groupId, dropResult) {
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.$store.getters.scene)
        const group = scene.children.filter((p) => p.id === groupId)[0]
        const itemIndex = scene.children.indexOf(group)
        console.log(itemIndex)
        const newGroup = Object.assign({}, group)
        console.log(newGroup, dropResult)

        // check if element was ADDED in current group
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          dropResult.payload.loading = true
          // simulate api call
          setTimeout(function () {
            dropResult.payload.loading = false
          }, Math.random() * 5000 + 1000)
        }
        console.log(newGroup, scene)
        newGroup.children = applyDrag(newGroup.children, dropResult)
        scene.children.splice(itemIndex, 1, newGroup)
        this.scene = scene
      }
    },
    getCardPayload(groupId) {
      return (index) => {
        console.log(
          groupId,
          this.$store.getters.scene.children.filter((p) => p.id === groupId)
        )
        return this.$store.getters.scene.children.filter(
          (p) => p.id === groupId
        )[0].tasks[index]
      }
    },
  },

  components: { taskPreview, taskDetails, Container, Draggable },
}
</script>
<style>
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
