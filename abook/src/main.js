import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Button from '@/components/components/Button/Button.vue';
import Tooltip from '@/components/components/Tooltip/Tooltip.vue';
import InputField from '@/components/components/InputField/InputField.vue';
import Icon from '@/components/components/Icon/Icon.vue';
import DropDownMenuVue from '@/components/components/DropDownMenu/DropDownMenu.vue';
import Loader from '@/components/components/Loader/Loader.vue';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('Button', Button);
app.component('Tooltip', Tooltip);
app.component('InputField', InputField);
app.component('Icon', Icon);
app.component('Loader', Loader);
app.component('DropDownMenuVue', DropDownMenuVue);
app.mount('#app');
