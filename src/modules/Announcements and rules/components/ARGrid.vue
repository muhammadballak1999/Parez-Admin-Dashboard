<template>
    <v-card
        outlined
        tile
    >
    <v-card-title class="d-flex title justify-space-between align-center">
        <p class="mb-0 title-text" style="width: 80%">{{announcementAndRule.title}}</p>
        <global-menu @delete="$emit('show_delete_alert')" @edit="$emit('show_edit_dialog')"/>
    </v-card-title>
    <v-img 
    contain
    height="150px" 
    :src="announcementAndRule.attachment ? announcementAndRule.attachment.url : 'https://waterfountain.no/wp-content/uploads/2019/11/placeholder.png'">
    <v-btn
    class="text-capitalize ml-2"
    color="error"
    x-small
    v-if="announcementAndRule.attachment"
    @click="$emit('show_delete_announcement_and_rule_image_alert')"
    >
      <v-icon x-small dark>
        mdi-delete
      </v-icon>
      delete image
    </v-btn>
    </v-img>
    <v-card-text class="content pt-5"><p class="content-text mb-0">{{announcementAndRule.content}}</p></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            fab
            outlined
            x-small
            @click="$emit('show_announcement_and_rule')"
          >
            <v-icon dark>
                mdi-eye
            </v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: ['announcementAndRule'],
    
}
</script>
<style scoped>
.content {
    height: 165px !important;
    max-height: 165px !important;
    min-height: 165px !important;
}

.content-text {
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden
}

.title-text {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>