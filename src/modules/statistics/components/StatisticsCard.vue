<template>
    <v-card class="pa-3">
    <v-col>
        <div class="d-flex justify-space-between">
            <h4 class="font-weight-regular">{{data.value}}</h4>
            <v-icon color="primary">
                mdi-{{data.icon}}
            </v-icon>
        </div>
        <p class="body-1 grey--text">{{data.title}}</p>
    </v-col>
    </v-card>
</template>

<script>
export default {
    props: ["data"]
}
</script>

<style scoped>
h4 {
    font-size: 34px;
}
</style>