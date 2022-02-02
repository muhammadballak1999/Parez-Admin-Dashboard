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
}
</style>