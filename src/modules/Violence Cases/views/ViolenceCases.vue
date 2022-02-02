<template>
<div>
    <global-header module="violence cases" @click_event="dialog = true;" title="Violence Cases" :items="breadcrumps" />
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <location-picker @get="getAddress" @close_map="dialog = false" v-model="location" :key="1" />
    <!-- <show-on-map @close_map="dialog = false" :coords="{lat: 36.191113, lng: 44.009167}" /> -->
    </v-dialog>
</div>
</template>
<script>
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
      location: {},
      dialog: false
    }
  },
  methods: {
    getAddress(payload) {
      // console.log(payload);
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