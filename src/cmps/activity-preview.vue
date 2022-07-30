<template>
    <li class="activity-preview flex" v-if="activity">
        <div class="img-activity-container">
            <avatar-preview :member="activity.byMember" :avatarSize="'big'" />
        </div>
        <div>
            <h3 class="member-fullname">{{ activity?.byMember?.fullname }}</h3>
            <p class="activity-details"> {{ ' ' + activity.txt }}</p>
            <p class="activity-time-ago">{{ timeAgo }}</p>
        </div>
    </li>
</template>
<script>
import avatarPreview from './avatar-preview.vue'
import { utilService } from '../services/util-service';

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
        timeAgo() {
            return (utilService.timeAgo(this.activity.createdAt) || 'just now')
        }
    },
    components: {
        avatarPreview
    }
}
</script>
