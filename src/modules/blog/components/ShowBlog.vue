<template>
  <v-card>
        <v-card-title>
          <span class="text-h5">{{blog.title}}</span>
        </v-card-title>
        <v-img contain height="300px" :src="blog.attachment ? blog.attachment.url : 'https://waterfountain.no/wp-content/uploads/2019/11/placeholder.png'"></v-img>
        <v-card-text class="mt-3">
            <p>
              {{blog.content}}
            </p>
        </v-card-text>
        <v-card-actions class="sticky-position secondary bottom">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="$emit('close_dialog')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card> 
</template>
<script>
export default {
  props: ['blog'],
  mounted() {
    console.log(this.blog)
  }
}
</script>
<style scoped>
.sticky-position {
    position: sticky !important;
}

.bottom {
    bottom: 0 !important
}
</style>