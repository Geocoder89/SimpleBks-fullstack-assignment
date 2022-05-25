import Vue from 'vue'
import App from './App.vue'
import {router} from './_helpers'
import axios from 'axios'
import Toasted from 'vue-toasted';



// http set up with axios


axios.defaults.baseURL = 'http://localhost:3000/'


Vue.config.productionTip = false



Vue.use(Toasted, {
  duration: 1000
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
