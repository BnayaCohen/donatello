<template>
  <div class="checklist-list">
    <checklist-preview
      v-for="checklist in checklists"
      :checklist="checklist"
      @saveChecklist="saveChecklist"
      @removeChecklist="removeChecklist"
      :key="checklist.id"
    />
  </div>
</template>

<script>
import checklistPreview from './checklist-preview.vue'
export default {
  props: { checklists: Array },
  methods: {
    removeChecklist(checklistId) {
      const idx = this.copyChecklists.findIndex(
        (checklist) => checklist.id === checklistId
      )
      if (idx !== -1) this.copyChecklists.splice(idx, 1)
      this.save()
    },
    saveChecklist(checklist) {
      const idx = this.copyChecklists.findIndex(
        (curChecklist) => curChecklist.id === checklist.id
      )
      this.copyChecklists.splice(idx, 1, checklist)
      this.save()
    },
    save() {
      this.$emit(
        'saveChecklists',
        JSON.parse(JSON.stringify(this.copyChecklists))
      )
    },
  },
  computed: {
    copyChecklists() {
      return JSON.parse(JSON.stringify(this.checklists))
    },
  },
  components: { checklistPreview },
}
</script>
