<template>
</template>
<script>
import Datepicker from 'vuejs3-datepicker'
import { ref } from 'vue'

export default {
    data() {
        return {
            dueDate: ref(new Date()),
        }
    },
    methods: {
        updateDueDate() {
            this.$emit('updateDueDate')
        }
    },
    components: ['DatePicker'],
    emits
}
</script>
<style>
    
</style>