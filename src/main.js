import Vue from 'vue';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbvue/build/css/mdb.css';
import App from './App.vue';
import router from './router';
import store from './store';

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// // import { fab } from '@fortawesome/free-brands-svg-icons'

// // Add all icons to the library so you can use it in your page
// library.add(fas, far)

require('./plugins');

// library.add(faSitemap, faInbox, faFolder, faEdit, faTrashAlt)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');