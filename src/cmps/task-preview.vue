<template>
    <div class="task-wrapper">
        <li class="task-li">
            <div class="task-preview">
                <p>{{task.title}}</p>
            </div>
        </li>

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