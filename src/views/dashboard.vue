<template>
  <div class="screen-overlay-wrapper">
    <div class="screen-overlay heavy-dark"></div>
  </div>
  <div class="dashboard-modal flex flex-column align-center">
    <div class="dash-modal-wrapper">
      <button
        class="trellicons trellicons-close-btn dashboard-close"
        @click="closeDashboard"
      ></button>
      <header class="dashboard-header flex flex-column">
        <h1>Welcome, {{ user.fullname }}</h1>
        <h2 class="flex">
          <span style="margin-right: 5px">{{ board.title }},</span>
          {{ todayFixed }}
        </h2>
      </header>
      <section class="general-statistics flex">
        <div class="flex tasks-stats-wrapper">
          <div class="stats tasks flex row-reverse justify-between">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="55"
                height="55"
                viewBox="3 0 340 300"
                style="
                  enable-background: new 0 0 299.998 299.998;
                  fill: whitesmoke;
                "
                xml:space="preserve"
                            class="align-self-center"

              >
                <g>
                  <g>
                    <path
                      d="M149.995,0.001C67.156,0.001,0,67.16,0,149.999s67.156,149.997,149.995,149.997s150.003-67.161,150.003-149.997
			C299.997,67.157,232.834,0.001,149.995,0.001z M217.205,217.204c0,10.066-8.159,18.225-18.223,18.225h-97.967
			c-10.068,0-18.225-8.159-18.225-18.225V82.79c0-10.066,8.159-18.225,18.225-18.225h76.892v36.45h39.298V217.204z M185.688,93.232
			V64.563l31.517,28.669H185.688z"
                    />
                  </g>
                </g>
              </svg>
              <h3 class="flex flex-column">
                Tasks
                <h4>{{ taskCount }}</h4>
              </h3>
          </div>
        </div>
        <div class="stats small circle-bar flex flex-column">
          <h3>Completed tasks</h3>
          <div class="percent-container flex align-center justify-center">
            <h2>{{ donePercentDisplay }}</h2>
            <svg
            
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-1 -1 34 34"
              class="pos-absolute"
            >
              <circle
                cx="16"
                cy="16"
                r="15.9155"
                class="in-progress-bar__background"
              />

              <circle
                cx="16"
                cy="16"
                r="15.9155"
                class="in-progress-bar__progress js-progress-bar"
                ref="inProgressCircle"
              />
            </svg>
          </div>
        </div>

        <div class="stats lists flex justify-between">
          <div class="content flex row-reverse justify-between">
            <svg
                        class="align-self-center"

              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              height="50"
              width="50"
              viewBox="0 0 300 300"
              style="
                enable-background: new 0 0 300 300;
                fill: whitesmoke;
                margin-inline-end: 10px;
                margin-block-start: 10px;
              "
              xml:space="preserve"
            >
              <g>
                <g>
                  <g>
                    <polygon
                      points="101.009,137.203 95.889,132.275 88.692,139.75 101.219,151.805 119.336,133.333 111.931,126.069 			"
                    />
                    <rect
                      x="132.56"
                      y="203.818"
                      width="72.487"
                      height="15.562"
                    />
                    <polygon
                      points="101.009,211.697 95.889,206.769 88.692,214.242 101.219,226.302 119.336,207.828 111.931,200.563 			"
                    />
                    <polygon
                      points="101.009,174.525 95.889,169.597 88.692,177.07 101.219,189.13 119.336,170.656 111.931,163.391 			"
                    />
                    <rect
                      x="132.56"
                      y="129.321"
                      width="72.487"
                      height="15.562"
                    />
                    <rect
                      x="132.56"
                      y="166.643"
                      width="72.487"
                      height="15.562"
                    />
                    <path
                      d="M149.997,0C67.157,0,0,67.159,0,149.997C0,232.838,67.157,300,149.997,300S300,232.838,300,149.997
				C299.997,67.159,232.838,0,149.997,0z M187.911,54.829L224.1,95.28h-36.189V54.829z M231.061,231.71h-0.002
				c0,12.239-9.918,22.16-22.157,22.16h-119.1c-12.245,0-22.16-9.921-22.16-22.16V68.29c0-12.237,9.915-22.16,22.16-22.16h82.547
				v64.708h58.712V231.71z"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <h3 class="flex flex-column">
              Lists
              <h4>{{ listCount }}</h4>
            </h3>
          </div>
        </div>
        <div class="stats members flex row-reverse justify-between">
          <svg
            id="Capa_1"
            x="0px"
            y="0px"
            width=" "
            height="120"
            viewBox="10 0 495 180"
            style="enable-background: new 0 0 479.293 479.293; fill: whitesmoke;"
            class="align-self-center"
          >
            <g>
              <g>
                <path
                  d="M179.379,248.994l16.238-8.453c2.654-1.383,5.585-2.212,8.565-2.455c-1.731-1.782-3.425-3.628-5.069-5.551
			c-19.569-22.905-30.346-53.182-30.346-85.254c0-42.062,10.536-73.904,31.315-94.637c3.263-3.255,6.76-6.217,10.48-8.897
			c-4.008-0.368-8.099-0.548-12.26-0.548c-49.112,0-88.925,24.368-88.925,104.082C109.379,197.163,139.359,238.839,179.379,248.994z
			"
                />
                <path
                  d="M62.872,397.28l44.863-101.063c3.695-8.324,10.18-15.227,18.26-19.434l20.074-10.449
			c-5.081-2.75-10.002-5.904-14.721-9.474c-1.383-1.045-3.242-1.2-4.777-0.401l-69.624,36.244
			c-4.489,2.336-8.091,6.17-10.144,10.795L1.939,404.561c-3.092,6.966-2.458,14.938,1.696,21.329
			c4.154,6.389,11.184,10.204,18.806,10.204h43.775c-0.094-0.144-0.198-0.277-0.292-0.421
			C58.446,424.17,57.306,409.818,62.872,397.28z"
                />
                <path
                  d="M280.988,251.364c49.11,0,88.924-46.6,88.924-104.082c0-79.714-39.812-104.082-88.924-104.082
			c-49.113,0-88.926,24.368-88.926,104.082C192.063,204.765,231.876,251.364,280.988,251.364z"
                />
                <path
                  d="M477.354,404.561L432.49,303.498c-2.053-4.625-5.656-8.459-10.146-10.797l-69.624-36.242
			c-1.535-0.799-3.396-0.644-4.777,0.4c-19.689,14.895-42.844,22.768-66.955,22.768c-24.112,0-47.265-7.873-66.958-22.768
			c-1.383-1.045-3.242-1.201-4.777-0.4l-69.623,36.242c-4.489,2.338-8.091,6.172-10.144,10.797L84.624,404.561
			c-3.092,6.966-2.458,14.938,1.696,21.329c4.154,6.389,11.184,10.204,18.806,10.204h351.726c7.622,0,14.652-3.814,18.806-10.204
			C479.811,419.499,480.445,411.525,477.354,404.561z"
                />
              </g>
            </g>
          </svg>
          <h3 class="flex flex-column">
            Members
            <h4>{{ memberCount }}</h4>
          </h3>
        </div>
        <div class="stats overdue flex justify-between">
          <div class="content flex flex-column justify-between">
            <h3 class="flex flex-column">
              Overdue
              <h4>{{ overdueCount }}</h4>
            </h3>
          </div>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 45 68"
            xml:space="preserve"
          >
            <g>
              <path
                d="M58.693,53.636L46.848,33.33c-0.405-0.695-1.128-1.11-1.933-1.11c-0.805,0-1.528,0.415-1.933,1.11L31.137,53.636
		c-0.409,0.7-0.412,1.539-0.008,2.242c0.404,0.703,1.129,1.123,1.94,1.123h23.691c0.811,0,1.536-0.42,1.939-1.123
		C59.104,55.175,59.102,54.337,58.693,53.636z M56.966,54.882c-0.03,0.055-0.092,0.119-0.205,0.119H33.07
		c-0.114,0-0.175-0.064-0.206-0.119s-0.056-0.14,0.001-0.238L44.71,34.338c0.057-0.098,0.143-0.118,0.206-0.118
		c0.062,0,0.148,0.021,0.205,0.118l11.845,20.306C57.022,54.742,56.998,54.827,56.966,54.882z"
              />
              <path
                d="M45,39.001c-0.552,0-1,0.447-1,1v8c0,0.553,0.448,1,1,1s1-0.447,1-1v-8C46,39.448,45.552,39.001,45,39.001z"
              />
              <path
                d="M44.29,51.291C44.11,51.48,44,51.74,44,52.001c0,0.26,0.11,0.52,0.29,0.7c0.18,0.189,0.44,0.3,0.71,0.3s0.52-0.11,0.7-0.29
		c0.19-0.19,0.3-0.44,0.3-0.71c0-0.271-0.11-0.521-0.29-0.71C45.34,50.921,44.66,50.921,44.29,51.291z"
              />
              <path
                d="M52,6.001c0-0.552-0.448-1-1-1h-5v-3c0-0.553-0.448-1-1-1h-7c-0.552,0-1,0.447-1,1v3H15v-3c0-0.553-0.448-1-1-1H7
		c-0.552,0-1,0.447-1,1v3H1c-0.552,0-1,0.448-1,1v9h52V6.001z M13,6.001v3H8v-3v-3h5V6.001z M44,6.001v3h-5v-3v-3h5V6.001z"
              />
              <path
                d="M28.546,52.124l11.845-20.306c0.173-0.297,0.381-0.565,0.605-0.817h-0.51H37v-8h8v6.224c1.825,0.03,3.52,1.015,4.44,2.595
		L52,36.208v-5.029V18.001c0-0.553-0.448-1-1-1H1c-0.552,0-1,0.447-1,1v39c0,0.553,0.448,1,1,1h27.958
		c-0.156-0.198-0.302-0.406-0.43-0.629C27.597,55.75,27.604,53.739,28.546,52.124z M15,51.001H7v-8h8V51.001z M15,41.001H7v-8h8
		V41.001z M15,31.001H7v-8h8V31.001z M25,51.001h-7h-1v-8h8V51.001z M25,41.001h-8v-8h8V41.001z M25,31.001h-8v-8h1h7V31.001z
		 M27,23.001h7h1v8h-8V23.001z"
              />
            </g>
          </svg>
        </div>
      </section>
      <section class="chart-container flex">
        <div class="task-per-label flex flex-column">
          <h1>Task per Label</h1>
          <DoughnutChart :options="optionsDoughnut" :chartData="labelsData" />
        </div>
        <div class="task-per-member flex flex-column">
          <h1>Task per Member</h1>
          <BarChart :options="optionsBar" :chartData="membersData" />
        </div>
        <div class="flex flex-column">
          <h1>Task due-date statistics</h1>
          <BarChart :options="optionsBar" :chartData="doneTasksData" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { DoughnutChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { utilService } from '../services/util-service.js'
import { right } from '@popperjs/core'
Chart.register(...registerables)

export default {
  name: 'dashboard',
  components: { DoughnutChart, BarChart },
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      board: this.$store.getters.board,
      statusMap: null,
      labelsData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#f2d600',
              '#ff9f1a',
              '#eb5a46',
              '#c377e0',
              '#0079bf',
              '#00c2e0',
              '#51e898',
            ],
          },
        ],
      },
      membersData: {
        labels: [''],
        datasets: [],
      },
      doneTasksData: {
        labels: [''],
        datasets: [],
      },
      optionsBar: {
        scales: {
          y: {
            max: 12,
            display: false,
          },
          yAxes: {
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: '#fff',
              font: {
                size: 16,
              },
            },
          },
        },
      },
      optionsDoughnut: {
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: '#fff',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    }
  },
  created() {
    const labelsDataSet = this.$store.getters.labelToTaskMap
    const membersDataSets = this.$store.getters.memberToTaskMap
    const doneTasksDataSets = this.$store.getters.doneTasksPerGroup
    Object.keys(labelsDataSet).map((label) => {
      this.labelsData.labels.push(label)
      this.labelsData.datasets[0].data.push(labelsDataSet[label])
    })
    this.membersData.datasets = membersDataSets
    this.doneTasksData.datasets = doneTasksDataSets
  },
  mounted() {
    this.inProgressPerctage()
  },
  computed: {
    taskCount() {
      let counter = 0
      this.board.groups.map((group) => {
        counter += group.tasks.length
      })
      return counter
    },
    listCount() {
      return this.board?.groups?.length
    },
    memberCount() {
      return this.board.members?.length || 0
    },
    todayFixed() {
      return new Date(Date.now()).toLocaleDateString()
    },
    donePercentDisplay() {
      if (!this.statusMap || !this.statusMap['done']) return '0%'
      return ((this.statusMap['done'] / this.taskCount) * 100).toFixed(0) + '%'
    },
    overdueCount() {
      return this.$store.getters.taskOverdueCount
    },
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    closeDashboard() {
      this.$router.push('/board/' + this.board._id)
    },
    inProgressPerctage() {
      this.statusMap = this.$store.getters.taskStatusMap
      var percentageComplete = this.statusMap['done'] / this.taskCount
      var strokeDashOffsetValue = 100 - percentageComplete * 100
      this.$refs.inProgressCircle.style.strokeDashoffset = strokeDashOffsetValue
    },
  },
}
</script>
<style></style>
