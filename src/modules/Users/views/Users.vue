<template>
<div>
    <global-header module="users" @click_event="dialog = true;" title="Users" :items="breadcrumps" />
    <div class="mt-6 mb-6">
      <v-tabs
      fixed-tabs
      color="primary"
      class="elevation-4"
    >
      <v-tab
      @click="tab = 'admins'; keyword = ''; getAdmins();"
       class="text-capitalize"
      >
        Admins
      </v-tab>
      <v-tab
      @click="tab = 'police stations'; keyword = ''; getPoliceStations();"
       class="text-capitalize"
      >
        Police stations
      </v-tab>
      <v-tab
      @click="tab = 'users'; keyword = ''; getUsers();"
       class="text-capitalize"
      >
        Users
      </v-tab>
    </v-tabs>
    <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="10"
    class="elevation-4"
    :loading="loading && data.length === 0"
    >
     <template v-slot:top>
      <v-toolbar
        flat
        color="accent"
      >
      <v-toolbar-title class="text-capitalize">{{tab}}</v-toolbar-title>
        <v-spacer />
      <v-text-field
        outlined
        dense
        rounded
        v-model="keyword"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="search-input"
        v-debounce:500="search"
      ></v-text-field>
      </v-toolbar>
    </template>
   <template v-slot:item.index="{ index }">
     {{index}}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data is available!
    </template>
    </v-data-table>
    
    </div>
</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    data: () => ({
      tab: 'admins',
      keyword: '',
      loading: false,
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users',
          disabled: true,
          href: 'users',
        },
      ],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'index',
        },
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'E-Mail', value: 'email', sortable: false },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Age', value: 'age', sortable: false },
        { text: 'City', value: 'city', sortable: false },
        { text: 'Marital status', value: 'marital_status', sortable: false },
        { text: 'Role', value: 'type.role', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),
    computed: {
      ...mapState('userStore', ['admins', 'police_stations', 'users']),
      data() {
        if(this.tab === 'admins') 
        return this.admins;
        else if(this.tab === 'users')
        return this.users;
        else
        return this.police_stations
      }
    },

   async created () {
     await this.initialize()
    },

    methods: {
      ...mapActions('userStore', ['getAdmins', 'getUsers', 'getPoliceStations', 'createUser', 'updateUser', 'deleteUser']),
     async initialize () {
       this.loading = true;
        await this.getAdmins();
        this.loading = false;
      },
      search() {
        console.log(this.keyword);
        if(this.tab === 'admins') 
        return this.getAdmins(this.keyword || undefined);
        else if(this.tab === 'users')
        return this.getUsers(this.keyword || undefined);
        else
        return this.getPoliceStations(this.keyword || undefined);
      }
    },
  }
</script>

<style lang="scss" scoped>
div.search-input {
  max-width: 25% !important;
}

@media (max-width: 633px) { 
  div.search-input {
    max-width: 100% !important;
  }
}

.active-tab {
  color: black;
}
</style>