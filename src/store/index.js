import Vue from 'vue';
import Vuex from 'vuex';
import authStore from './auth';
import blogStore from '../modules/blog/store';
import statisticsStore from '../modules/statistics/store';
import termsStore from '../modules/terms and conditions/store';
import rulesStore from '../modules/Announcements and rules/store';
import userStore from '../modules/Users/store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authStore,
    blogStore,
    statisticsStore,
    termsStore,
    rulesStore,
    userStore
  }
})
