import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firebaseApp } from '@/firebase/config.js'

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './assets/style/reset.css'
import './assets/style/global.scss'

import App from './App.vue'
import router from './router'

// Добавление иконок в библиотеку
// library.add(fas);


const app = createApp(App)
app.use(firebaseApp)
app.use(createPinia())
app.use(router)
app.mount('#app')