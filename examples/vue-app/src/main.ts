import './assets/main.css'

import { createApp } from 'vue'
import { createThumbmarkPlugin } from '@thumbmarkjs/vue'
import App from './App.vue'

const app = createApp(App)

// Install ThumbmarkJS plugin with your API key
app.use(createThumbmarkPlugin({
  apiKey: import.meta.env.VITE_THUMBMARK_API_KEY
}))

app.mount('#app')
