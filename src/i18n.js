import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './lang/en.json'
import ar from './lang/ar.json'
import ku from './lang/ku.json'

Vue.use(VueI18n);

if(localStorage.getItem('lang')){
    if(localStorage.getItem('lang') !== 'en') {
        if(localStorage.getItem('lang') !== 'ar') {
            if(localStorage.getItem('lang') !== 'ku') {
                localStorage.setItem('lang', 'en')
            }
        }
    }
} else {
    localStorage.setItem('lang', 'en')
}


export default new VueI18n({
    locale: localStorage.getItem('lang') || 'en',
    messages: {
        en: en,
        ar: ar,
        ku: ku
    }
})