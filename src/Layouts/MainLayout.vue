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
        <v-btn
          color="secondary"
          class="mr-4 primary--text text-capitalize"
          @click="logout"
          :loading="loading"
         >
         Logout
            <v-icon
        right
        dark
      >
        mdi-logout-variant
      </v-icon>
    </v-btn>
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
        color="secondary"
        style="position: fixed !important;"
      >
        <v-list
          nav
          dense
        >
          <v-list-item v-for="nav in navigations" :key="nav.id" @click="activate(nav.id)" :to="nav.root" :ripple="false" link>
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
        title: 'Statistics',
        icon: 'chart-bar',
        root: '/statistics'
        },
        {
        id:1,
        title: 'Violence cases',
        icon: 'alert-outline',
        root: '/violence-cases'
        },
        {
        id:2,
        title: 'Blogs',
        icon: 'post-outline',
        root: '/blogs'
        },
        {
        id:3,
        title: 'Announcements and rules',
        icon: 'bullhorn-outline',
        root: '/announcements-and-rules'
        },
        {
        id:4,
        title: 'Notifications',
        icon: 'bell-outline',
        root: '/notifications'
        },
        {
        id:5,
        title: 'Users',
        icon: 'account-group',
        root: '/users'
        },
        {
        id:6,
        title: 'Terms and conditions',
        icon: 'help',
        root: '/terms-and-conditions'
        },
        {
        id:7,
        title: 'About',
        icon: 'information-outline',
        root: '/about'
        },
      ]
    }
  },
  methods : {
    ...mapMutations('authStore',['SIGN_OUT']),
    activate(id) {
      this.value = id;
    },
   async logout() {
       await this.SIGN_OUT();
    }
  },
 async created() {
    for(let i = 0 ; i<this.navigations.length ; i++) {
      if(this.$route.path === this.navigations[i].root){
      this.activate(this.navigations[i].id)
      }
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
