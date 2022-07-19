import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Styles
import "./assets/styles/styles.scss";

const app = createApp(App)

app.use(router)

app.mount('#app')
