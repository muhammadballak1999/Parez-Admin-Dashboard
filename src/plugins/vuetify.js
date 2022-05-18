import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  rtl: localStorage.getItem('lang') !== 'en' ? true : false,
  theme: {
    themes: {
      light: {
        primary: '#6D4C41',
        secondary: '#FFBF00',
        accent: '#FFE082',
        error: '#FB5968',
      },
    },
  },
});
