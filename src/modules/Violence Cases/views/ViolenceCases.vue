<template>
<div>
    <global-header module="violenceCases" @click_event="dialog = true;" :title="$t('label.violenceCases')" :items="breadcrumps" />
    <div class="mt-6 mb-6">
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="10"
    class="elevation-4"
    :item-class="itemColor"
    :loading="loading && data.length === 0"
    :footer-props="{itemsPerPageText: $t('table.recordsPerPage')}"
    :no-data-text="$t('table.noData')"
    >
     <template v-slot:top>
      <v-toolbar
        flat
        color="accent"
      >
      <v-toolbar-title class="text-capitalize">{{$t('label.violenceCases')}}</v-toolbar-title>
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
   <template v-slot:item.createdAt="{ item }">
     {{item.createdAt | dateFormat}}
    </template>
     <template v-slot:item.status="{ item }">
     <v-menu>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          text
          rounded
          class="text-capitalize"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon color="primary">mdi-chevron-down</v-icon>
        {{$t(`label.${item.status.status.toLowerCase()}`)}}
        </v-btn>
        </template>

      <v-list>
        <v-list-item 
        @click="updateViolenceCaseStatus({id: item.id, status: status.id});" 
        v-for="status in  statusList" 
        :key="status.key" 
        :disabled="status.id === item.status.id">
          <v-list-item-title>{{$t(`label.${status['status'].toLowerCase()}`)}}</v-list-item-title>
        </v-list-item>
      </v-list>
     </v-menu>
    </template>
    <!-- <template v-slot:item.actions="{ item }">
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
    </template> -->
    <template v-slot:item.map="{ item }">
        <v-btn @click="waypoints = [
        {lat: item.police_station.police_station.latitude, lng: item.police_station.police_station.longitude},
        {lat: item.latitude, lng: item.longitude}
        ]; mapDialog = true;" class="text-capitalize" color="primary" rounded outlined>{{$t('label.showOnMap')}}</v-btn>
    </template>
    <template v-slot:no-data>
      {{$t('table.noData')}}
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
import { REQUEST } from '../../../Request';
import { GET } from '../../../Request/requestMethods';
export default {
  data() {
    return {
      breadcrumps: [
        {
          text: this.$t('label.home'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('label.violenceCases'),
          disabled: true,
          href: 'violencecases',
        },
      ],
      showMap: false,
      waypoints: [],
      location: {},
      statusList: [],
      dialog: false,
      mapDialog: false,
      headers: [
        {text: '#', align: 'start', sortable: false, value: 'index'},
        {text: this.$t('label.policeStation'), align: 'start', sortable: false, value: 'police_station.name'},
        {text: this.$t('label.victim'), align: 'start', sortable: false, value: 'victim.name'},
        { text: this.$t('label.createdAt'), value: 'createdAt', sortable: false },
        { text: this.$t('label.showOnMap'), value: 'map', align:'center', sortable: false },
        { text: this.$t('label.status'), value: 'status', align:'center', sortable: false },
        // { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  components: {
    ShowOnMap
  },
  computed: {
      ...mapState('violenceCasesStore', ['data']),
  },
  filters: {
    dateFormat(val) {
      let date = new Date(val);
      return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
    }
  },
  methods: {
    ...mapActions('violenceCasesStore', ['getViolenceCases', 'updateViolenceCaseStatus']),
    itemColor(item) {

      if(item.status['status'] === 'pending')
      return 'yellow accent-1';

      if(item.status['status'] === 'approved')
      return 'yellow accent-1';

      if(item.status['status'] === 'solved')
      return 'green accent-1';

      if(item.status['status'] === 'rejected')
      return 'red accent-1';
      
    },
    getAddress(payload) {
      console.log(payload);
      this.dialog = false;
    },
      test(a, b) {
        console.log(a);
        console.log(b);
      }
  },
 async created() {
    try{
    this.loading = true;
    this.getViolenceCases();
    this.loading = false;
    let response = await REQUEST('/case-status', GET);
    this.statusList = response.data;
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