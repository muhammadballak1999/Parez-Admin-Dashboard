<template>
<div>
     <global-header module="announcementsAndRules" @click_event="action='create'; open = true; dialog = true;" :title="$t('label.announcementsAndRules')" :items="breadcrumps" />
        <div class="d-flex flex-column align-center">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="3"
            v-if="loading && annoncementsAndRules.length === 0"
          ></v-progress-linear>
      <div v-if="!loading && annoncementsAndRules.length === 0" class="d-flex flex-column align-center">
       <p class="mb-0">{{$t('table.noData')}}</p>
       <v-btn text rounded @click="action='create'; open = true; dialog = true;" class="text-capitalize mt-2" color="primary">
         {{$t('label.create') + ' ' + $t('label.announcementsAndRules')}}
       </v-btn>
        </div>
   </div>
  <div class="mt-6">
    <v-row>
      <v-col
        v-for="announcementAndRule in annoncementsAndRules"
        :key="announcementAndRule.id"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
      <ar-grid 
      :announcementAndRule="announcementAndRule"
      @show_announcement_and_rule="
      announcementAndRuleToShow.title = announcementAndRule.title; 
      announcementAndRuleToShow.content = announcementAndRule.content;
      announcementAndRuleToShow.attachment = announcementAndRule.attachment;
      show = true;
      "
      @show_delete_alert="open_delete_alert(announcementAndRule.id)"
      @show_edit_dialog="open_edit_dialog(announcementAndRule);"
      @show_delete_announcement_and_rule_image_alert="id = announcementAndRule.id; delete_alert_2 = true;"
      />
      </v-col>
    </v-row>
  </div>
    <v-dialog
      v-model="dialog"
      width="600px"
  >
  <global-dialog-content :action="action" :title="$t('label.announcementsAndRules')" @submit="submit" @close_dialog="clear(); dialog = false;">
    <template v-slot:dialog-content>
        <v-form
        ref="form"
        class="form"
        v-model="valid"
        lazy-validation
       >
      <v-text-field
        v-model="announcementAndRule.title"
        ref="title"
        :label="`${$t('label.title')} *`"
        outlined
        dense
        :rules="titleRules"
         required
      ></v-text-field>
      <image-input v-if="open" @change_image="change_image" />
      <v-textarea
          v-model="announcementAndRule.content"
          ref="content"
          outlined
          class="mt-6"
          :label="$t('label.content')"
          :rules="contentRules"
          required
      ></v-textarea>
        </v-form>
    </template>
  </global-dialog-content>
  </v-dialog>
    <v-dialog
      v-model="show"
      width="600px"
  >
  <show-ar :announcementAndRule="announcementAndRuleToShow" @close_dialog="show = false;" />
  </v-dialog>
    <v-dialog
      v-model="delete_alert_1"
      width="350px"
  >
   <global-delete-alert @close="delete_alert_1 = false;" @submit="deleteAnnouncementAndRule(id); delete_alert_1 = false;" />
    </v-dialog>
      <v-dialog
      v-model="delete_alert_2"
      width="350px"
  >
   <global-delete-alert @close="delete_alert_2 = false;" @submit="deleteAnnouncementAndRuleImage(id); delete_alert_2 = false;" />
    </v-dialog>
</div>
</template>
<script>
import ArGrid from '../components/ARGrid.vue';
import ShowAr from '../components/ShowAR.vue';
import { dataURItoBlob } from '../../../utils/dataURItoBlob';
import { mapState, mapActions } from 'vuex';
import { toast } from '../../../utils/toast'
export default{
    data() {
        return {
        breadcrumps: [
        {
          text: this.$t('label.home'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('label.announcementsAndRules'),
          disabled: true,
          href: 'announcementsandrules',
        },
      ],
      dialog: false,
      show: false,
      delete_alert_1: false,
      delete_alert_2: false,
      loading: false,
      id: null,
      valid: true,
      action: 'add',
      dataURI: null,
      open: true,
      announcementAndRule: {
        title: '',
        image: null,
        content: ''
      },
      announcementAndRuleToShow: {
        title: '',
        attachment: null,
        content: ''
      },
      titleRules:[
        v => !!v || '',
      ],
      contentRules: 
       [
        v => !!v || '',
       ]
      }
    },
    computed: {
      ...mapState('rulesStore', ['annoncementsAndRules'])
    },
    components: {
      ArGrid,
      ShowAr,
    },
    methods: {
      ...mapActions('rulesStore', 
      ['getAnnouncementsAndRules', 
      'createAnnouncementAndRule', 
      'updateAnnouncementAndRule', 
      'deleteAnnouncementAndRule', 
      'deleteAnnouncementAndRuleImage']),

       async submit() {
          await this.$refs.form.validate();
          if(this.valid) {
            this.dialog = false;
            if(this.dataURI){
            this.announcementAndRule.image = await dataURItoBlob(this.dataURI);
            }

            let form = new FormData();
            form.append('title', this.announcementAndRule.title);
            form.append('content', this.announcementAndRule.content);
            if(this.dataURI){
            form.append('attachment', this.announcementAndRule.image);
            }
            if(this.action === 'create'){
            await this.createAnnouncementAndRule(form);
            toast('Annonuncement and Rule created successfully', 'success');
            }else{
            await this.updateAnnouncementAndRule({id: this.id, body: form});
            toast('Annonuncement and Rule updated successfully', 'success');
            }
            this.clear();
          }
        },
        open_edit_dialog(announcementAndRule) {
            this.action = 'edit';
            this.id = announcementAndRule.id;
            this.announcementAndRule.title = announcementAndRule.title;
            this.announcementAndRule.content = announcementAndRule.content;
            this.open = true;
            this.dialog = true;
        },
         open_delete_alert(id) {
            this.id = id;
            this.delete_alert_1 = true;
        },
        change_image(payload) {
          this.dataURI = payload;
        },
        clear() {
            this.announcementAndRule.title = '';
            this.announcementAndRule.content = '';
            this.announcementAndRule.image = null;
            setTimeout(() => {
            this.open = false;
            }, 500);
        }
    },
    async mounted() {
      this.loading = true;
      await this.getAnnouncementsAndRules();
      this.loading = false;
    }
}
</script>

