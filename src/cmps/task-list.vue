<template>
  <ul class="container clean-list task-list">
    <task-preview
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @click.stop="openTask(task.groupId, task.id)"
    />
  </ul>
</template>
<script>
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
    }
  },
  methods: {
    openTask(groupId, taskId) {
        this.$router.push(this.$router.currentRoute._value.path + `/${groupId}/${taskId}`)
    },
  },
  created() {},
  components: { taskPreview, taskDetails },
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
