<template>
    <div class="container task-preview">
        <h3>{{task.title}}</h3>
    </div>
</template>
<script>
export default {
    name: 'taskPreview',
    props: {
        task: {
            type: Object
        }
    },
    data() {
        return {

        }
    }

}
</script>
<style>
    
</style>