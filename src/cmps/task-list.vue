<template>
  <ul class="container clean-list task-list">
    <Container>
      <Draggable v-for="task in tasks" :key="task.id">
        <task-preview :task="task" />
      </Draggable>
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
  },
  data() {
    return {
      isTaskDetail: false,
      items: [],
    }
  },
  methods: {},
  //   getChildPayload (index) {
  //     console.log(index)
  //   return {

  //   }
  // },
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
