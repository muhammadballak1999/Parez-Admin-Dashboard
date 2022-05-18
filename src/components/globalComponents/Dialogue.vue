<template>
  <v-card>
        <v-card-title class="accent sticky-position top">
          <span class="text-h5 text-capitalize">{{$t(`label.${action}`)}}{{' '}}{{title}}</span>
        </v-card-title>
        <v-card-text>
            <slot name="dialog-content"></slot>
        </v-card-text>
        <v-card-actions fixed class="accent sticky-position bottom">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="$emit('close_dialog')"
          >
            {{$t('label.close')}}
          </v-btn>
          <v-btn
            color="primary"
            @click="$emit('submit')"
            :loading="loading"
          >
            {{$t('label.ok')}}
          </v-btn>
        </v-card-actions>
      </v-card> 
</template>
<script>
export default {
    props: ["action", "title", "loading"]
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