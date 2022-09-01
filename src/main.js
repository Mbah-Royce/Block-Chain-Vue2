import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Notifications from 'vue-notification'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(Notifications)

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.VUE_APP_WEBSOCKET_APP_KEY,
//     wsHost: process.env.VUE_APP_WEBSOCKET_APP_SERVER,
//     wsPort: 6001,
//     disableStats: true,
//     forceTLS: false
// });


Vue.use(VueMapbox, { mapboxgl: Mapbox });
Vue.use(VueLoading)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')