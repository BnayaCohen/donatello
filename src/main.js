import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';

// Styles
import "./assets/styles/styles.scss";

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueUniversalModal, {
    teleportTarget: '#modals',
    modalComponent: 'modal',
  });
app.mount('#app')
