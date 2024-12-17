import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import './assets/styles/tailwind.css'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Toast options
const toastOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 2000,                
    closeOnClick: true,           
    pauseOnHover: true,           
    draggable: true,             
    draggablePercent: 0.6,        
  };

createApp(App).use(store).use(Toast, toastOptions).mount('#app')
