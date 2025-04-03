import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { i18n } from '@/i18n'
import { applyTheme, getThemePreference } from '@/services/themeService'

import '@/style.css'
applyTheme(getThemePreference())

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
