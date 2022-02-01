<template>
  <v-card>
        <v-card-title class="secondary sticky-position top">
          <span class="text-h5 text-capitalize">{{action}}{{' '}}{{title}}</span>
        </v-card-title>
        <v-card-text>
            <slot name="dialog-content"></slot>
        </v-card-text>
        <v-card-actions fixed class="secondary sticky-position bottom">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="$emit('close_dialog')"
          >
            Cancle
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="$emit('submit')"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card> 
</template>
<script>
export default {
    props: ["action", "title"]
}
</script>
<style scoped>
.sticky-position {
    position: sticky !important;
}

.top {
    top: 0 !important
}

.bottom {
    bottom: 0 !important
}

.v-dialog > .v-card > .v-card__text {
    padding: 24px 24px 0px !important;
}

.v-card__title {
    z-index: 100022 !important;
}
</style>