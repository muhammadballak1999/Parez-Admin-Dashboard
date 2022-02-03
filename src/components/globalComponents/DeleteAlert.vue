<template>
      <v-card>
        <v-card-title class="text-h5 accent">
          Warning!
        </v-card-title>

        <v-card-text class="text-h6 mt-4">
            Are you sure?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        <v-btn
            color="error"
            @click="$emit('close')"
          >
           Close
          </v-btn>
          <v-btn
            color="primary"
            @click="$emit('submit')"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
</template>