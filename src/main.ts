import { createApp } from 'vue'
import DataVVue3 from '@kjgl77/datav-vue3'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import "././mock/index.js"
import router from './router'
import App from './App.vue'
import 'virtual:uno.css'

const app = createApp(App)
app.use(DataVVue3)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

