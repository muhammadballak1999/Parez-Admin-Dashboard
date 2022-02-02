<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
tr:nth-child(even) {
    background-color: #FFE082 !important;
}

img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive.leaflet-marker-draggable {
    width: 40px !important;
    height: 40px !important;
}

div.leaflet-control-zoom {
  border: none !important;
}

.leaflet-bar a { 
  border-color: transparent !important;
}

.leaflet-control-zoom a {
  color: white !important;
  background: rgba(0, 0, 0, 0.5) !important;
  margin: 0 !important;
  padding: 0 !important;
  transition: all 0.5s ease;
}

.leaflet-control-zoom a:hover {
  color: white !important;
  background: rgba(0, 0, 0, 0.9) !important;
}

div.leaflet-control-geosearch form {
  height: 30px !important;
  border-radius: 2px !important;
  line-height: 30px !important;
}

a.reset {
  line-height: 30px !important;
  height: 30px !important;
}
</style>