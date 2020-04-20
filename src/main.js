import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueResource from 'vue-resource';
import store from "./store";
import "./plugins/element.js";
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'


Vue.use(ElementUI);
Vue.use(vueResource);
Vue.use(VueCookies);

// Vue.http.options.root = '/Getlogin';
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
