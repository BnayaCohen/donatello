<template>
  <ul class="container clean-list task-list">
    <Container
      v-if="tasks.length"
      class="flex-grow overflow-y-auto overflow-x-hidden"
      orientation="vertical"
      group-name="col-items"
      :shouldAcceptDrop="
        (e, payload) => e.groupName === 'col-items' && !payload.loading
      "
      :get-child-payload="getCardPayload(groupId)"
      :drop-placeholder="{
        className: `bg-primary bg-opacity-20  
            border-dotted border-2 
            border-primary rounded-lg mx-4 my-2`,
        animationDuration: '200',
        showOnTop: true,
      }"
      drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
      drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
      @drop="(e) => onCardDrop(groupId, e)"
    >
      <Draggable v-for="task in tasks" :key="task.id">
        <task-preview :task="task" />
      </Draggable>
    </Container>
  </ul>
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
      scene: this.$store.getters.scene,
    }
  },
  methods: {
    getColumnHeightPx() {
      let kanban = document.getElementById('kanbanContainer')
      return kanban ? kanban.offsetHeight - 122 : 0
    },
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
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
        console.log(newColumn)
        // check if element was ADDED in current group
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          console.log(newColumn)
          console.log('elements changed between columns')
          dropResult.payload.loading = true
          // simulate api call
          setTimeout(function () {
            dropResult.payload.loading = false
          }, Math.random() * 5000 + 1000)
        }

        newColumn.tasks = applyDrag(newColumn.tasks, dropResult)
        // TODO:store call
        this.$store.dispatch({ type: 'updateGroups', itemIndex, newColumn })
        // scene.children.splice(itemIndex, 1, newColumn)
        // this.scene = scene
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
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
