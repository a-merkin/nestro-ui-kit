import { createApp } from 'vue';
import './assets/fonts.css';
import 'nestro-ui-kit/style.css';
import UIkit from 'nestro-ui-kit';
import router from './router/index';
import App from './App.vue';

createApp(App).use(UIkit).use(router).mount('#app');
