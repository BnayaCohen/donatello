<template>
    <header class="board-header flex justify-between">
        <section class="board-options">
            <input type="text" placeholder="Enter board name here">
            <button>&#9734;</button>
            <div class="members-container">
                <p>.....</p>
                <button>Invite</button>
            </div>
        </section>
        <section class="more-options">
            <button>Dashboard</button>
            <button>Show menu</button>
        </section>
    </header>
</template>
<script>
export default {
    name: 'boardHeader',
    data() {
        return {

        }
    },
}
</script>
<style>
    
</style>