<template>
  <div class="description-container flex flex-column">
    <div class="description-header flex align-center">
      <span class="trellicons trellicons-description"></span>
      <h3>Description</h3>
    </div>
    <div class="task-description-txt">
      <textarea
        rows="3"
        placeholder="Add a more detailed description..."
        ref="taskDescription"
        v-model="description"
        @click.stop="isEditDescription = !isEditDescription"
        :class="descriptionStyle"
      ></textarea>
      <div v-if="isEditDescription" class="description-btns flex align-center">
        <el-button @click.stop="saveDescription">Save</el-button>
        <el-button @click.stop="isEditDescription = false">X</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        description: String
    },
  data() {
    return {
      isEditDescription: false,
    }
  },
  created() {
      },
  mounted() {
      this.$refs.taskDescription.value = this.description
  },
  computed: {
    descriptionStyle() {
      return this.isEditDescription
        ? 'description-textarea'
        : 'description-fake-textarea'
    },
  },
  methods: {
    saveDescription() {
        this.$emit('saveDescription', this.description)
        this.isEditDescription = false
    }
  },
  emits: ['saveDescription']
}
</script>
<style></style>
