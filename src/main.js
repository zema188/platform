import './assets/style/reset.css'
import './assets/style/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from './router'


const firebaseConfig = {
    apiKey: "AIzaSyDHVm4_wl2OyrXes6S2O33RturQ1boQDLI",
    authDomain: "platform-89f1c.firebaseapp.com",
    projectId: "platform-89f1c",
    storageBucket: "platform-89f1c.appspot.com",
    messagingSenderId: "234494138620",
    appId: "1:234494138620:web:08d831994e1d9770dfdf79"
  };


initializeApp(firebaseConfig);


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')