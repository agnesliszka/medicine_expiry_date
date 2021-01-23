import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.use(ElementUI);
window.axios = require("axios");

new Vue({
  el: "#app",
  store: store,
  render: h => h(App)
});
