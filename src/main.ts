import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/globals.scss'

async function enableMock() {
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'
  if (import.meta.env.DEV && useMock) {
    const { worker } = await import('./mocks/server')
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: { url: '/mockServiceWorker.js' },
    })
  }
}
enableMock().then(() => {
  createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
})
