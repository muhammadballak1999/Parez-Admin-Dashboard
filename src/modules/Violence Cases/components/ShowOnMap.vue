<template>
<div style="min-height: 0 !important;">
    <l-map v-if="show" class="map" :zoom="zoom" :center="center">
      <l-tile-layer
        :url="osmUrl"
        :attribution="attribution"
        />
      <l-routing-machine :waypoints="waypoints"/>
    </l-map>
           <v-btn class="text-capitalize" style="z-index: 1000; height: 42px !important;" @click="openInGoogleMaps" color="primary" rounded x-large fixed top left>
            <v-icon
              left
            >
              mdi-crosshairs-gps
            </v-icon>
           {{$t('label.showOnGoogleMaps')}}
        </v-btn>
      <v-btn style="z-index: 1000; height: 42px !important; width:42px !important;" @click="$emit('close_map')" color="primary" fab fixed top right>
        <v-icon
        dark
        >
            mdi-close       
         </v-icon>
        </v-btn>
</div>
</template>

<script>
import { LMap, LTileLayer, LIcon } from 'vue2-leaflet';
import LRoutingMachine from '../components/LRoutingMachine.vue';
const attribution = '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
import { icon, Icon } from 'leaflet';
export default {
  components: { LMap, LTileLayer, LRoutingMachine, LIcon },
  props: ['waypoints'],
  data () {
    return {
      show: false,
      zoom: 12,
      center: { lat: 36.1911624, lng: 44.0094652 },
      osmUrl,
      attribution,
      icon: icon({
        iconUrl:  require("../../../assets/pin.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
    }
  },
  methods: {
    openInGoogleMaps() {
      console.log(`https://www.google.com/maps/dir/?api=1&origin=${this.waypoints[0].lat},${this.waypoints[0].lng}&destination=${this.waypoints[1].lat},${this.waypoints[1].lng}`);
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${this.waypoints[0].lat},${this.waypoints[0].lng}&destination=${this.waypoints[1].lat},${this.waypoints[1].lng}`, '_blank')
    }
  },
  mounted() {
      setTimeout(() => {
        this.show = true;
      }, 200);
      delete Icon.Default.prototype._getIconUrl;
        Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
  }
}
</script>

<style>
@import "../../../../node_modules/leaflet/dist/leaflet.css";
</style>