<template>
  <l-map
    v-if="show"
    ref="map"
    @dblclick="onMapClick"
    :options="{doubleClickZoom: false}"
    :zoom="zoom"
    :zoomDelta="12"
    :center="[
      position.lat || userLocation.lat || defaultLocation.lat,
      position.lng || userLocation.lng || defaultLocation.lng
    ]"
  >
      <v-btn style="z-index: 1000;" @click="$emit('close_map')" color="primary" fab fixed top right>
        <v-icon
        dark
        >
            mdi-close       
         </v-icon>
        </v-btn>
         <v-btn class="text-capitalize" style="z-index: 1000;" @click="getLocation" color="primary" rounded x-large fixed left bottom>
            <v-icon
              left
            >
              mdi-crosshairs-gps
            </v-icon>
           Choose Location
        </v-btn>
      <v-btn @click="getUserPosition" style="z-index: 1000;" color="secondary" fab fixed bottom right>
        <v-img height="24" width="24" :src="require('../../assets/pin.png')" contain></v-img>
        </v-btn>
    <l-tile-layer
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
    />
    <l-geosearch :options="geoSearchOptions"></l-geosearch>
    <l-marker
      v-if="position.lat && position.lng"
      visible
      draggable
      :lat-lng.sync="position"
      @dragstart="dragging = true"
      @dragend="dragging = false"
      :icon="icon"
    >
      <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          :icon-url="iconUrl"
        />
      <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
    </l-marker>
  </l-map>
</template>
<script>
import { LMap, LMarker, LTileLayer, LTooltip, LIcon, LControlZoom } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LGeosearch from "vue2-leaflet-geosearch";
import { icon } from "leaflet";
export default {
  name: "LocationInput",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LGeosearch,
    LIcon,
    LControlZoom
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 36.1901,
        lng: 43.9930
      })
    }
  },
  data() {
    return {
      loading: false,
      show : false,
      coords:null,
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
        style: 'button',
      },
      userLocation: {},
      position: {},
      address: "",
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      },
      zoom: 12,
      dragging: false,
      icon: icon({
        iconUrl:  require("../../assets/pin.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
    };
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        this.coords = value
        }
    }
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
     iconUrl() {
      return require("../../assets/pin.png");
    },
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`;
    }
  },
  methods: {
    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;
      return address;
    },
    getLocation() {
        this.$emit("get", { position: this.coords, address: this.address });
    },
    async onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
    },
    onSearch(value) {
      const loc = value.location;
      this.position = { lat: loc.y, lng: loc.x };
    },
    async getUserPosition() {
        if (navigator.geolocation) {
        // get GPS position
        navigator.geolocation.getCurrentPosition(pos => {
          // set the user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.onMapClick({latlng: this.userLocation});
        });

      }
    },
  },
 mounted() {
     setTimeout(async () => {
          this.show = true;
      }, 100);
      setTimeout(() => {
         this.getUserPosition();
         this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
      }, 200);
  }
};
</script>
