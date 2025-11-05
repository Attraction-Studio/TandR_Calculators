import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Mount the app to a container element
const containerId = 'seismic-calculator-baffle-app'
const container = document.getElementById(containerId)

if (container) {
  createApp(App).mount(container)
} else {
  // Fallback: create container if it doesn't exist
  const appContainer = document.createElement('div')
  appContainer.id = containerId
  document.body.appendChild(appContainer)
  createApp(App).mount(appContainer)
}

