import Vue from "vue";
import App from "./App.vue";
import router from "./routes/router";
import store from "./store/store";
// plugins
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
// helpers
import http from "./utils/http";

Vue.use(Vuelidate);
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
