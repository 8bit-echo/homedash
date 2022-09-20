import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store, { key } from './store';
import router from './router';
import { cilHome, cilSettings } from '@coreui/icons';

const icons = {
  cilHome,
  cilSettings,
}

createApp(App).use(router).use(store, key).provide('icons', icons).mount('#app');
