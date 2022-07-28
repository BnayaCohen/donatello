<template>
  <div class="description-container flex flex-column">
    <div class="description-header flex align-center">
      <span class="trellicons trellicons-description"></span>
      <h3>Description</h3>
      <button v-if="description && !isEditDescription" @click="openDescription" class="edit-description-btn flex">
        Edit
      </button>
    </div>
    <div class="task-description-txt">
      <p class="description-dummy" v-if="description && !isEditDescription" @click="openDescription">
        {{ description }}
      </p>
      <textarea
        v-else
        rows="3"
        placeholder="Add a more detailed description..."
        ref="taskDescription"
        v-model="description"
        :class="descriptionStyle"
        class="basic-input"
        @click="openDescription"
      ></textarea>
      <div v-if="isEditDescription" class="description-btns flex align-center">
        <button class="description-save-btn" @click.stop="saveDescription">Save</button>
        <button class="description-cancel-btn" @click.stop="closeDescription">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    description: String,
  },
  data() {
    return {
      isEditDescription: false,
    }
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
    },
    openDescription() {
      this.isEditDescription = true
    },
    closeDescription() {
      this.isEditDescription = false
    },
  },
  emits: ['saveDescription'],
}
</script>
<style></style>
