<template>
    <v-card>
        <v-btn @click="$emit('close_map')" color="primary" fab fixed top right>
        <v-icon
        dark
        >
            mdi-close       
         </v-icon>
        </v-btn>
        <!-- <v-toolbar
          dark
          color="primary"
          style="position: fixed; top:0;"
        >
          <v-btn
            icon
            dark
            @click="$emit('close_map');"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Location</v-toolbar-title>
        </v-toolbar> -->
        <div class="parent">
          <iframe :src="`https://maps.google.com/maps?q=${coords.lat}, ${coords.lng}&z=15&output=embed`" width="100%" frameborder="0" style="border:0"></iframe>
      </div>
      </v-card>
</template>
<script>
export default  {
    props: ['coords']
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