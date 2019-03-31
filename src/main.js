import Vue from 'vue';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbvue/build/css/mdb.css';
import App from './App.vue';
import router from './router';
import store from './store';

require('./plugins');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');