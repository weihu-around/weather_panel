import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(ElementPlus)  // 加载ElementPlus模块

app.mount('#app')
// createApp(App).mount('#app')
