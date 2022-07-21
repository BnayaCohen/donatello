<template>
    <li class="activity-preview flex" v-if="activity">
        <div class="img-activity-container">
            <img class="member-avatar-big"
                src="https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-1024.png"
                :alt="activity.byMember?.fullname">
        </div>
        <div>
            <h3 class="member-fullname">{{ activity.byMember.fullname }}</h3>
            <p class="activity-details">{{ activity.txt }}</p>
            <p class="activity-time-ago">{{ timeAgo }}</p>
        </div>
    </li>
</template>
<script>
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
            return utilService.timeAgo(this.activity.createdAt)
        }
    },
    components: {
    }
}
</script>
