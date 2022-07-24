<template>
      <Transition name="label">
    <div class="board-task-label" :style="labelColor" :class="{ shown: showLabel }" @click.stop="toggleLabels">
     <Transition name="fade">
     <p v-if="showLabel">{{ label.title }}</p>
    </Transition>
    </div>
      </Transition>
</template>

<script>
export default {
    props: {
        label: Object,
    },
    computed: {
        labelColor() {
            return {
                backgroundColor: this.label.color
            }
        },
        showLabel() {
            return this.$store.getters.showLabelsOnTask
        }
    },
    methods: {
        toggleLabels() {
            this.$store.commit({ type: 'toggleTaskLabels' })
        },
    },
}
</script>

