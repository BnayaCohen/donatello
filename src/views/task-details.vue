<template>
  <section class="container task-detail">
    <div>
    </div>
  </section>
</template>
<script>
import {boardService} from '../services/board-service.js'
export default {
  name: 'taskDetails',
  props: {
    taskId: String,
  },
  data() {
    return {
      task: null,
    }
  },
  async created() {
    const {boardId, taskId, groupId } = this.$route.params
    this.task = await boardService.getTaskById(boardId, groupId, taskId)
    console.log(this.task);
  },
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
