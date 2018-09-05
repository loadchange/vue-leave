import Vue from 'vue'
import App from './App.vue'
import VueLeave from '../lib/index'

Vue.use(VueLeave)
new Vue({
  el: '#app',
  render: h => h(App)
})
