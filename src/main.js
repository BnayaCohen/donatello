import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { focusDirective, clickOutsideDirective } from './directives'

// Styles
import "./assets/styles/styles.scss";

const app = createApp(App)

app.directive('focus', focusDirective)
app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
