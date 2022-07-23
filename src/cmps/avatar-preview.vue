<template>
    <img :class="avatarSizeClass" :src="img" :alt="member.fullname">
</template>
<script>
export default {
    name: 'avatar-preview',
    props: {
        member: Object,
        avatarSize: String
    },
    computed: {
        img() {
            //member.imgUrl?member.imgUrl:
            return 'https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-1024.png'
        },
        avatarSizeClass() {
            return 'member-avatar-' + this.avatarSize
        }
    },
}
</script>
