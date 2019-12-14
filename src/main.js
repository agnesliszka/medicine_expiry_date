import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import { store } from './store/store.js'

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
