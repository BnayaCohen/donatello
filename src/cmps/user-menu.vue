<template>
  <div
    class="dynamic-popover pos-absolute user-menu-popover"
  >
    <div class="popover-header flex justify-center align-center">
      <h4>Account</h4>
      <button class="pop-close-btn" @click.stop="$emit('toggleUserMenu', $event)">
        <span class="trellicons trellicons-close-btn"></span>
      </button>
    </div>
    <div class="popover-content"> 
      <div class="cover-pop-over-content">
        <div class="about-user flex flex-column">
            <div class="user-details flex align-center">
                <img class="member-avatar-big" :src="user.imgUrl"/>
                <div class="flex flex-column align-center">
                    <span>{{user.fullname}}</span>
                    <h3 class="small-title">{{user.username}}</h3>
                </div>
            </div>
            <div :style="{padding: '6px 0'}">
                <button class="full-btn" @click="$emit('logout')">Log out</button>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
    props: {
        pos: Object
    },
    created() {
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
}
</script>
<style>
    
</style>