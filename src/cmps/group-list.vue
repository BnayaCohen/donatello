<template>
    <section class="group-list-container">
        <group-preview v-for="(group, i) in groups" :group="group" :key="i"/>
    </section>
</template>

<script>
import groupPreview from './group-preview.vue'

export default {
    props: {
        groups: Array,
    },
    created() {
        console.log(groups);
    },
    components: {
        groupPreview,
    },
}
</script>