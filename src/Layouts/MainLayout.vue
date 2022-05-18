<template>
  <v-app>
  <v-app-bar
      app
      color="primary"
      dark
      height="56"
      :elevation="0"
      fixed
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
          text
          class="ml-2"
        >
        <v-icon>
          mdi-web
        </v-icon>
          {{lang}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLang('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLang('ku')">
          <v-list-item-title>کوردی</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLang('ar')">
          <v-list-item-title>عربی</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
          <v-menu
        bottom
        left
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="d-flex column"
            >
            <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item  @click="logout" ripple>
            <v-list-item-title>
             <p class="mb-0 primary--text">
               <v-icon class="mr-1" color="primary" small>
               mdi-logout-variant
               </v-icon>
                {{$t('label.logout')}}
               </p>
            </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </v-app-bar>
    <v-main> 
    <div class="main-container" style="
    padding-top: 80px !important; 
    padding-right: 40px !important; 
    padding-left: 40px !important;">
      <router-view/>
    </div>
    </v-main>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        :overlay-opacity="0"
        hide-overlay
        temporary
        :right="$i18n.locale !== 'en'"
        :dir="$i18n.locale !== 'en' ? 'rtl' : 'ltr'"
        color="secondary"
        style="position: fixed !important;"
      >
        <v-list
          nav
          dense
        >
          <v-list-item class="mr-0" v-for="nav in navigations" :key="nav.id" @click="activate(nav.id)" :to="nav.root" :ripple="false" link>
            <v-list-item-icon>
              <v-icon>mdi-{{nav.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{nav.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import { REQUEST } from '../Request';
import { GET } from '../Request/requestMethods';
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      value: 0,
      showHeaderNBottom: false,
      drawer: false,
      navigations:[
        {
        id:0,
        title: this.$t('label.statistics'),
        icon: 'chart-bar',
        root: '/statistics'
        },
        {
        id:1,
        title: this.$t('label.violenceCases'),
        icon: 'alert-outline',
        root: '/violence-cases'
        },
        {
        id:2,
        title: this.$t('label.blogs'),
        icon: 'post-outline',
        root: '/blogs'
        },
        {
        id:3,
        title: this.$t('label.announcementsAndRules'),
        icon: 'bullhorn-outline',
        root: '/announcements-and-rules'
        },
        {
        id:4,
        title: this.$t('label.notifications'),
        icon: 'bell-outline',
        root: '/notifications'
        },
        {
        id:5,
        title: this.$t('label.users'),
        icon: 'account-group',
        root: '/users'
        },
        {
        id:6,
        title: this.$t('label.termsAndConditions'),
        icon: 'help',
        root: '/terms-and-conditions'
        },
        {
        id:7,
        title: this.$t('label.about'),
        icon: 'information-outline',
        root: '/about'
        },
        {
        id:8,
        title: this.$t('label.reports'),
        icon: 'chart-timeline',
        root: '/report'
        },
      ]
    }
  },
  computed: {
    lang() {
      if(localStorage.getItem('lang') === 'en')
      return 'English'
      else if(localStorage.getItem('lang') === 'ar') 
      return 'عربی'
      else
      return 'کوردی'
    }
  },
  methods : {
    ...mapMutations('authStore',['SIGN_OUT']),
    activate(id) {
      this.value = id;
    },
   async logout() {
       await this.SIGN_OUT();
    },
    changeLang(lang) {
      localStorage.setItem('lang', lang)
      window.location.reload();
    }
  },
 async created() {
    for(let i = 0 ; i<this.navigations.length ; i++) {
      if(this.$route.path === this.navigations[i].root){
      this.activate(this.navigations[i].id)
      }
    }
  },
  async mounted() {
    let response = await REQUEST("/me", GET)
      if(response.data.isSuspended) {
      localStorage.removeItem('accessToken');
      location.replace('/')
      }
  }
};
</script>
<style>
.b {
  border: 1px solid black;
}

/* overrides */

div.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: #F4F1DE !important;
}

.v-item-group.v-bottom-navigation--absolute {
    position: fixed !important;
    bottom: 0 !important;
}

main.v-main {
    padding: 0px 0px 0px !important;
}
</style>
