<template>
    <div class="screen"></div>
    <main class="dashboard-page dashboard-layout">
        <h1>{{ board.title }}</h1>
        <span @click="goBack" class="trellicons trellicons-close-btn"></span>
        <section class="dashboard-content">
            <div v-for="(item, i) in items" :style="i === 3 ? { background: '#FF6666' } : ''" :key="i"
                class="item-content">
                <h3 class="item-title">{{ item.title }}</h3>
                <div class="inline-flex">
                    <span v-if="i !== 1">{{ item.data }}</span>
                    <div v-else class="stats small  flex flex-column">
                        <div style="position:relative" class="percent-container flex align-center justify-center">
                            <span>{{ item.data }}</span>
                            <div class="progressbar">
                                <div class="precent" :style="{ width: item.data }"></div>
                            </div>
                        </div>
                    </div>
                    <span :class="item.icon"></span>
                </div>
            </div>
        </section>
        <section class="chart-container flex">
            <div class="chart">
                <h1>Task per Label</h1>
                <DoughnutChart :options="optionsDoughnut" :chartData="labelsData" />
            </div>
            <div class="chart">
                <h1>Task per Member</h1>
                <LineChart :options="optionsBar" :chartData="membersData" />
            </div>
            <div class="chart">
                <h1>Task due-date statistics</h1>
                <BarChart :options="optionsBar" :chartData="doneTasksData" />
            </div>
        </section>

    </main>
</template>

<script>
import { BarChart, LineChart, DoughnutChart } from 'vue-chart-3'
export default {
    components: { BarChart, LineChart, DoughnutChart },
    data() {
        return {
            board: this.$store.getters.board,
            membersData: {
                labels: this.$store.getters.taskPerMemberMap.labels,
                datasets: [this.$store.getters.taskPerMemberMap]
            },
            doneTasksData: { labels: [''], datasets: this.$store.getters.doneTasksPerGroup, },
            labelsData: { labels: this.$store.getters.labelsDataChart.labels, datasets: [this.$store.getters.labelsDataChart] },
            // Bar options
            optionsBar: {
                scales: {

                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
            // Donghut options
            optionsDoughnut: {
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'start',
                        display: false,

                        labels: {
                            color: '#42526e',
                            font: {
                                size: 16,
                            },
                        },
                    },
                },
            },
            items: [
                {
                    title: 'Tasks',
                    icon: 'fa-solid fa-list-check',
                    data: null
                },
                {
                    title: 'Completed tasks',
                    icon: 'fa-solid fa-bars-progress',
                    data: null
                },
                {
                    title: 'Members',
                    icon: 'fa-solid fa-users',
                    data: null
                },
                {
                    title: 'Overdue tasks',
                    icon: 'fa-solid fa-circle-exclamation',
                    data: null
                }
            ],
        }

    },
    created() {
        this.setItemsData()
        console.log(this.$store.getters.labelsDataChart)
        console.log(this.$store.getters.taskPerMemberMap)
    },
    computed: {
        taskCount() {
            return this.board.groups.reduce((acc, group) =>
                acc += group.tasks.length, 0
            )
        },
        memberCount() {
            return this.board.members?.length || 0
        },
        overdueCount() {
            return this.$store.getters.taskOverdueCount
        },
        completedTasksPrecentage() {
            const completed = this.board.groups.reduce((acc, group) => acc += group.tasks.reduce((acc, task) => { return acc = task.status === 'done' ? acc + 1 : acc }, 0), 0)
            const amount = completed && Math.trunc((completed / this.taskCount) * 100)
            return amount + '%'
        },
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        goBack() {
            this.$router.push('/board/' + this.board._id)
        },
        setItemsData() {
            this.items[0].data = this.taskCount
            this.items[1].data = this.completedTasksPrecentage
            this.items[2].data = this.memberCount
            this.items[3].data = this.overdueCount
        },
        closeDashboard() {
            this.$router.push('/board/' + this.board._id)
        },
    },
}
</script>
