import Vue from 'vue';
import Vuex from 'vuex';
import authStore from './auth';
import blogStore from '../modules/blog/store';
import statisticsStore from '../modules/statistics/store';
import rulesStore from '../modules/Announcements and rules/store';
import userStore from '../modules/Users/store';
import notificationStore from '../modules/notification/store';
import violenceCasesStore from '../modules/Violence Cases/store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authStore,
    blogStore,
    statisticsStore,
    rulesStore,
    userStore,
    violenceCasesStore,
    notificationStore
  }
})
