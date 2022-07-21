<template>
    <li class="activity-preview" v-if="activity">
        <!-- <img :src="activity.byMember?.imgUrl" :alt="activity.byMember?.fullname"> -->
        <h3 class="member-fullname">{{}}</h3>
    </li>
</template>
<script>
export default {
    name: 'activity-preview',
    props: {
        activity: Object,
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {

    },
    components: {
    }
}
</script>
