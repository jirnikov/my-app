import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as fb from 'firebase'
import BuyModalComponent from '@/components/Shared/BuyModal.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.component('AppBuyModal', BuyModalComponent)
new Vue({
  router,
  store,
  vuetify,
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCBZ9pR5GAIAREeIfwIbzYLlpanbvP0ZZ8',
      authDomain: 'app-my-77215.firebaseapp.com',
      databaseURL: 'https://app-my-77215.firebaseio.com',
      projectId: 'app-my-77215',
      storageBucket: 'app-my-77215.appspot.com',
      messagingSenderId: '784880257707',
      appId: '1:784880257707:web:73daef4d3f2003e00ac5ee'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
