import Vue from 'vue'
import Vuex from 'vuex'
import table from "../store/table";
import request from "./request";
import sandbox from "./sandbox";
import statistic from "./statistic";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    table,
    request,
    sandbox,
    statistic
  }
})
