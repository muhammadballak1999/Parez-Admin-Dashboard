<template>
    <div>
        <div class="flex-column">
        <div class="d-flex">
        <h1>{{title}}</h1>
        </div>
        <div class="d-flex justify-space-between">
        <v-breadcrumbs
            class="pl-0 pt-2"
            :items="items"
            divider="/"
        ></v-breadcrumbs>
        <v-btn
        v-if="module !== 'statistics' 
         && module !== 'termsAndConditions'
         && module !== 'about' 
         && module !== 'violenceCases' 
         && module !== 'reports'"
        color="primary"
        large
        rounded
        class="text-capitalize"
        @click="$emit('click_event')"
        
        >{{$t('label.create')}}{{' '}}{{$t(`label.${module}`)}}</v-btn>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'items', 'module'],
}
</script>
