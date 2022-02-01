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

</style>