import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import ads from './ads'
import orders from './orders'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ads,
    user,
    shared,
    orders
  }
})
