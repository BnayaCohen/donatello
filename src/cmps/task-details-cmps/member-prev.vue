<template>
    <div v-if="memberIds?.length" class="members-container">
        <h3 style="margin: 0 8px 4px 0" class="small-title">Members</h3>
        <div style="display: inline-block; margin: 0 4px 4px 0" v-for="memberId in memberIds" :key="memberId"
            class="img-container">
            <avatar-preview :member="getMemberById(memberId)" :avatarSize="'big'" />
        </div>
        <div @click="openPicker($event, 'members')" style="display:inline-block;"
            class="img-container add-member-btn trellicons"></div>
    </div>
</template>

<script>
import avatarPreview from '../avatar-preview.vue'
export default {
    components: { avatarPreview },
    props: { memberIds: Array },
    methods: {
        getMemberById(memberId) {
            const members = this.$store.getters.getMembers
            return members.find((member) => member._id === memberId)
        },
        openPicker(ev, type) {
            this.$emit('pickerOpened', { el: ev.target, type })
        },
    },
}
</script>