// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Moment from "moment";
import moment from "moment";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.moment = Moment;
Vue.prototype.$http = axios;
Vue.filter("dateFormat", function(dateStr, patten = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(patten);
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
