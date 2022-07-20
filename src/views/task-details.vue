<template>
  <section class="container task-detail">
    <div>
    </div>
  </section>
</template>
<script>
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
  created() {
    const { taskId, groupId } = this.$route.params
    const ids = {taskId, groupId}
    // this.task = this.$store.dispatch({type: 'getTask', ids})
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
