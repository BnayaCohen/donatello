<template>
    <div class="microphone-container" @click="toggleMic" :class="isRecordingClass">
        <button class="microphone-btn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="icon-microphone"
                height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z">
                </path>
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z">
                </path>
            </svg>
        </button>
    </div>
</template>

<script>
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default {
    name: 'mic-cmp',
    data() {
        return {
            isRecording: false,
            speechRecord: new Recognition(),
        }
    },
    mounted() {
        this.speechRecord.continuous = true
        this.speechRecord.interimResults = true
        this.speechRecord.onstart = () => {
            console.log('Start record')
            this.isRecording = true
        }
        this.speechRecord.onend = () => {
            console.log('Stop record')
            this.isRecording = false
        }
        this.speechRecord.onresult = (evt) => {
            this.$emit('updateText', evt.results[0][0].transcript)
        }
    },
    methods: {
        toggleMic() {
            if (this.isRecording) this.speechRecord.stop()
            else this.speechRecord.start()
        }
    },
    computed: {
        isRecordingClass() {
            return { recording: this.isRecording }
        },
    },
}
</script>

<style>
.microphone-container {
    padding: 6px;
    margin-top: 2px;
    cursor: pointer;
    height: 32px;
    width: 32px;
    border-radius: 50%;
}

.recording {
    animation: recordingWave 1.5s ease-in-out infinite;
}

.microphone-container .microphone-btn {
    border: none;
    padding: 0;
    background-color: transparent;
}

.microphone-container svg {
    color: #7e8187;
    cursor: pointer;
}

.microphone-container svg:hover {
    color: #172b4d;
}

@keyframes recordingWave {
    0% {
        background-color: transparent;
    }
    50% {
        opacity: 0.6;
        background-color: rgb(236, 148, 136);
    }
    100% {
        background-color: transparent;
    }
}
</style>