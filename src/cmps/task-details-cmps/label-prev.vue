<template>
              <div class="labels-container">
                <h3 v-show="this.taskLabels.length" class="small-title">
                  Labels
                </h3>
                <div class="task-labels">
                  <div
                    class="label-prev"
                    v-for="label in taskLabels"
                    :key="label.id"
                    @click="labelClicked"
                  >
                    <div
                      class="label-bg flex align-center justify-center"
                      :style="{ backgroundColor: label.color }"
                    >
                      <span>{{ label.title }}</span>
                    </div>
                  </div>
                <div>
                  <button
                    v-show="this.taskLabels.length"
                    class="add-label-btn"
                    @click.stop="toggleLabels"
                  >
                    <span class="trellicons trellicons-plus-sign"></span>
                  </button>
                </div>
                </div>
              </div>
</template>
<script>
export default {
    props: {
        taskLabels: Array
    },
    methods: {
        labelClicked(ev) {
            this.$emit('labelClicked', ev)
        }
    },
    emits: ['labelClicked']

}
</script>
<style>
    
</style>