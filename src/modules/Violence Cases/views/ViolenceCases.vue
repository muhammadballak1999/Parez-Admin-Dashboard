<template>
<div>
    <global-header module="violence cases" @click_event="dialog = true;" title="Violence Cases" :items="breadcrumps" />
    <div class="mt-6 mb-6">
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
      <v-toolbar-title class="text-capitalize">Violence Cases</v-toolbar-title>
        <!-- <v-spacer />
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
      ></v-text-field> -->
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
             <p class="mb-0 error--text"><v-icon class="mr-1" color="error" small>mdi-delete</v-icon>Delete</p>
            </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </template>
    <template v-slot:item.map="{ item }">
        <v-btn @click="waypoints = [
        {lat: item.police_station.police_station.latitude, lng: item.police_station.police_station.longitude},
        {lat: item.latitude, lng: item.longitude}
        ]; mapDialog = true;" class="text-capitalize" color="primary" rounded outlined> Show On Map</v-btn>
    </template>
    <template v-slot:no-data>
      No data is available!
    </template>
    </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <location-picker @get="getAddress" @close_map="dialog = false" v-model="location" :key="1" />
     </v-dialog>
    <v-dialog
      v-model="mapDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <show-on-map @close_map="mapDialog = false" :waypoints="waypoints" />
    </v-dialog>
</div>
</template>
<script>
import ShowOnMap from '../components/ShowOnMap.vue';
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Violence Cases',
          disabled: true,
          href: 'violencecases',
        },
      ],
      showMap: false,
      waypoints: [],
      location: {},
      dialog: false,
      mapDialog: false,
      headers: [
        {text: '#', align: 'start', sortable: false, value: 'index'},
        {text: 'Police station', align: 'start', sortable: false, value: 'police_station.name'},
        {text: 'Victim', align: 'start', sortable: false, value: 'victim.name'},
        { text: 'Occured at', value: 'createdAt', sortable: false },
        { text: 'Show on map', value: 'map', sortable: false },
        { text: 'Status', value: 'status.status', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  components: {
    ShowOnMap
  },
  computed: {
      ...mapState('violenceCasesStore', ['data']),
  },
  methods: {
    ...mapActions('violenceCasesStore', ['getViolenceCases']),
    getAddress(payload) {
      console.log(payload);
      this.dialog = false;
    },
  },
  created() {
    try{
    this.loading = true;
    this.getViolenceCases();
    this.loading = false;
    }catch{
      this.loading = false;
    }
  }
}
</script>
<style scoped>
.parent {
  height: 100vh !important;
}

iframe { 
  height: 100% !important;
}
</style>