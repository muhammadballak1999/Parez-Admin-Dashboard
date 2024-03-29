import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import GlobalHeader from './components/globalComponents/Header.vue';
import GlobalDialogue from './components/globalComponents/Dialogue.vue';
import GlobalMenu from './components/globalComponents/Menu.vue';
import GlobalDeleteAlert from './components/globalComponents/DeleteAlert.vue';
import ImageInput from './components/globalComponents/ImageInput.vue';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import LocationPicker from './components/globalComponents/LocationPicker.vue';
import vueDebounce from 'vue-debounce'
import VueTelInputVuetify from "vue-tel-input-vuetify";
//Import Froala Editor 
import 'froala-editor/js/plugins.pkgd.min.js';
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
import i18n from './i18n'

Vue.use(VueFroala)

let global_components = [
  {
  id:1,
  name:'global-header',
  component: GlobalHeader
  },
  {
    id:2,
    name:'global-dialog-content',
    component: GlobalDialogue
  },
  {
    id:3,
    name:'global-menu',
    component: GlobalMenu
  },
  {
    id:4,
    name:'global-delete-alert',
    component: GlobalDeleteAlert
  },
  {
    id:4,
    name:'image-input',
    component: ImageInput
  },
  {
    id:5,
    name:'location-picker',
    component: LocationPicker
  }
]

for(let i = 0; i<global_components.length; i++) {
  Vue.component(global_components[i].name, global_components[i].component);
}

Vue.use(Vuex);
Vue.use(VueToast);
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
  defaultTime: '500ms'
});

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
