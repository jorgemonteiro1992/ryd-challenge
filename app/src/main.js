import { createApp } from 'vue';
import '@/styles/global.scss';
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/lara-light-blue/theme.css';
import App from './App.vue';

createApp( App )
    .use( PrimeVue )
    .mount( '#app' );
