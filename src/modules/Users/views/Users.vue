<template>
<div>
    <global-header module="users" @click_event="action = 'create'; dialog = true;" title="Users" :items="breadcrumps" />
    <div class="mt-6 mb-6">
      <v-tabs
      fixed-tabs
      v-model="tab"
      color="primary"
      class="elevation-4"
    >
      <v-tab href="#admins" @click="keyword = ''; getAdmins();" class="text-capitalize">
        Admins
      </v-tab>
      <v-tab href="#police stations" @click="keyword = ''; getPoliceStations();" class="text-capitalize">
        Police stations
      </v-tab>
      <v-tab href="#users" @click="keyword = ''; getUsers();" class="text-capitalize">
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
      <v-menu
        bottom
        left
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item @click="action = 'update'; selectFields(item); dialog = true;" ripple>
            <v-list-item-title>
             <p class="mb-0 amber--text"><v-icon class="mr-1" color="amber" small>mdi-pencil</v-icon>Edit</p>
            </v-list-item-title>
            </v-list-item>
            <v-spacer></v-spacer>
            <v-list-item @click="id = item.id; delete_alert = true;" ripple>
            <v-list-item-title>
             <p class="mb-0 error--text"><v-icon class="mr-1" color="error" small>mdi-alert-octagon-outline</v-icon>Deactivate</p>
            </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </template>
      <template v-slot:item.isSuspended="{ item }">
        {{item.isSuspended ? 'deactivated' : 'active'}}
    </template>
    <template v-slot:no-data>
      No data is available!
    </template>
    </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      width="600px"
  >
  <global-dialog-content :action="action" title="user" @submit="submit" @close_dialog="clear(); dialog = false;">
    <template v-slot:dialog-content>
      <v-form
        ref="form"
        class="form"
        v-model="valid"
        lazy-validation
       >
      <v-text-field
        v-model="user.name"
        ref="name"
        label="Name"
        outlined
        dense
        :rules="nameRules"
         required
      ></v-text-field>
      <v-text-field
        v-model="user.username"
        ref="username"
        label="Username"
        outlined
        dense
        autocomplete="username"
        :rules="usernameRules"
         required
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        ref="email"
        label="E-mail"
        autocomplete="false"
        outlined
        dense
        :rules="emailRules"
         required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        autocomplete="new-password"
        ref="password"
        label="Password"
        outlined
        type="password"
        dense
        :rules="passwordRules"
         required
      ></v-text-field>
      <v-text-field
        v-model="user.city"
        ref="city"
        label="City"
        outlined
        dense
        :rules="cityRules"
         required
      ></v-text-field>
      <vue-tel-input-vuetify 
      defaultCountry 
      dense 
      outlined 
      :error-messages="error ? 'Please write a valid phone number!' : ''"
      :rules="phoneRules"
      v-model="user.phone">
      </vue-tel-input-vuetify>
      <v-select
        :loading="!areListsLoaded"
        :disabled="!areListsLoaded"
        :items="roles"
        v-model="type"
        :item-text="item =>`${item.role}`" 
        return-object
        dense
        label="User type"
        :rules="typeRules"
        outlined
        ref="type"
        v-if="action === 'create'"
        >
        </v-select>
        <v-btn v-if="type && type.role === 'police'" @click="map_dialog = true;" class="text-capitalize mb-6" color="primary" block>
          <v-icon>mdi-map-marker</v-icon>
          Choose location
        </v-btn>
        <v-text-field
        v-if="type && type.role === 'police'"
        v-model="user.location"
        ref="location"
        label="Location"
        outlined
        dense
        :rules="locationRules"
      ></v-text-field>
       <v-text-field
        v-if="type && type.role === 'police'"
        v-model="user.latitude"
        ref="latitude"
        label="Latitude"
        outlined
        dense
        :rules="latitudeRules"
      ></v-text-field>
        <v-text-field
        v-if="type && type.role === 'police'"
        v-model="user.longitude"
        ref="longitude"
        label="Longitude"
        outlined
        dense
        :rules="longitudeRules"
      ></v-text-field>
        <v-select
        :loading="!areListsLoaded"
        :disabled="!areListsLoaded"
        :items="marital_statuses"
        v-model="user.marital_status"
        :item-text="item =>`${item.status}`" 
        :item-value="item => item.id"
        dense
        label="Marital status"
        outlined
        ref="marital_status"
        >
        </v-select>
      </v-form>
    </template>
  </global-dialog-content>
    </v-dialog>
  <v-dialog
      v-model="delete_alert"
      width="350px"
  >
  <global-delete-alert @close="id = null; delete_alert = false;" @submit="removeUser(); delete_alert = false;" />
  </v-dialog>
  <v-dialog
      v-model="map_dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <location-picker :pos="coords" @get="getAddress" @close_map="map_dialog = false;" v-model="location" :key="1" />
  </v-dialog>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue"
import { REQUEST } from '../../../Request'
import { GET } from '../../../Request/requestMethods'
import { toast } from '../../../utils/toast';
export default {
    data: () => ({
      type: null,
      tab: 'admins',
      keyword: '',
      action: 'create',
      areListsLoaded: false,
      id: null,
      error: false,
      coords: {
        lat: 0,
        lng: 0
      },
      roles: [],
      marital_statuses: [],
      delete_alert: false,
      loading: false,
      location: {},
      dialog: false,
      map_dialog: false,
      valid: true,
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
        location: '',
        longitude: null,
        latitude: null,
        phone: null,
        city: '',
        type: null,
        marital_status: null
      },
      nameRules:[
        v => !!v || 'Name is required!',
      ],
      usernameRules:[
        v => !!v || 'Username is required!',
      ],
      emailRules: [
        v => !!v || 'E-mail is required!',
        v => /.+@.+/.test(v) || 'E-mail must be valid!',
      ],
      locationRules:[
        v => !!v || 'Location is required!',
      ],
      latitudeRules:[
        v => !!v || 'Latitude is required!',
      ],
      longitudeRules:[
        v => !!v || 'Longitude is required!',
      ],
      phoneRules:[
        v => !!v || 'Phone number is required!',
      ],
      cityRules:[
        v => !!v || 'City is required!',
      ],
      typeRules:[
        v => !!v || 'Type is required!',
      ],
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
        {text: '#', align: 'start', sortable: false, value: 'index'},
        {text: 'Name', align: 'start', sortable: false, value: 'name'},
        {text: 'Username', align: 'start', sortable: false, value: 'username'},
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'E-Mail', value: 'email', sortable: false },
        { text: 'Address', value: 'location', sortable: false },
        { text: 'Age', value: 'age', sortable: false },
        { text: 'City', value: 'city', sortable: false },
        { text: 'Marital status', value: 'marital_status.status', sortable: false },
        { text: 'Role', value: 'type.role', sortable: false },
        { text: 'Status', value: 'isSuspended', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),
    components: {
      VueTelInputVuetify
    },
    computed: {
      ...mapState('userStore', ['admins', 'police_stations', 'users']),
      passwordRules() {
        if(this.action === 'create'){
        return  [
         v => !!v || 'Password is required!',
         v => !!v && v.length >= 8 || 'Password must be at least 8 characters!' 
         ]
        }else{
         return  [
         v => {
           if(v){
             if(v.length < 8) {
               return 'Password must be at least 8 characters!';
             }else{
               return true;
             }
           }else{
             return true;
           }
           }
         ]
        }
      },
      data() {
        if(this.tab === 'admins') 
        return this.admins;
        else if(this.tab === 'users')
        return this.users;
        else
        return this.police_stations
      }
    },
    methods: {
      ...mapActions('userStore', ['getAdmins', 'getUsers', 'getPoliceStations', 'createUser', 'updateUser', 'deleteUser']),
     async initialize () {
       this.loading = true;
        await this.getAdmins();
        this.loading = false;
        await this.getUsers();
        await this.getPoliceStations();
      },
      search() {
        if(this.tab === 'admins') 
        return this.getAdmins(this.keyword || undefined);
        else if(this.tab === 'users')
        return this.getUsers(this.keyword || undefined);
        else
        return this.getPoliceStations(this.keyword || undefined);
      },
      getAddress(payload) {
        this.user.location = payload.address;
        this.user.latitude = payload.position.lat;
        this.user.longitude = payload.position.lng;
        this.map_dialog = false;
      },
      selectFields(user) {
        this.id = user.id
        this.user.name = user.name;
        this.user.username = user.username;
        this.user.email = user.email;
        this.user.phone = user.phone;
        this.user.marital_status = user.marital_status ? user.marital_status.id : null;
        this.user.location = user.location;
        this.user.city = user.city;
        this.type = user.type;
        if(this.type.role === 'police'){
        this.user.latitude = user.police_station.latitude;
        this.user.longitude = user.police_station.longitude;
        this.coords.lat = user.police_station.latitude;
        this.coords.lng = user.police_station.longitude;
        }
      },
    async submit() {
        await this.$refs.form.validate();
        if(!this.user.phone || isNaN(Number(this.user.phone.replaceAll(' ', '')))){
          this.error = true;
        }else{
          this.error = false;
        }

        if(!this.error  && this.valid) {
          this.dialog = false;
          if(this.action === 'create') {
            this.user.type = this.type.id;
            if(this.type.role === 'admin'){
              this.tab = 'admins';
            }else if(this.type.role === 'user') {
              this.tab = 'users';
            }else{
              this.tab = 'police stations'
            }
            await this.createUser({user: this.user, type: this.type.role});
          }else{
            this.user.type = undefined;
            await this.updateUser({user: this.user, id: this.id, type: this.tab});
            this.id = null;
          }
          this.$refs.form.reset();
        }
      },
     async removeUser() {
        await this.deleteUser({id: this.id, type: this.tab});
        this.id = null;
      },
      clear() {
         this.$refs.form.reset();
      }
    },
    async created () {
     await this.initialize()
    },
    async mounted() {
      this.areListsLoaded = false;
      let res_1 = await REQUEST('/roles', GET);
      let res_2 = await REQUEST('/marital-status', GET);
      if(res_1.success && res_2.success){
        this.roles = res_1.data;
        this.marital_statuses = res_2.data;
      }else{
        toast('Something went wrong!', 'error')
      }
      this.areListsLoaded = true;
    }
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