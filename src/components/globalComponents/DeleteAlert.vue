<template>
      <v-card>
        <v-card-title class="text-h5 accent">
          {{$t('label.warning')}}
        </v-card-title>

        <v-card-text class="text-h6 mt-4">
            {{$t('label.doubleCheck')}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        <v-btn
            color="error"
            @click="$emit('close')"
          >
          {{$t('label.close')}}
          </v-btn>
          <v-btn
            color="primary"
            @click="$emit('submit')"
          >
            {{$t('label.ok')}}
          </v-btn>
        </v-card-actions>
      </v-card>
</template>