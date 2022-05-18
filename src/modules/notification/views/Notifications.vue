<template>
<v-col class="pl-0">
  <global-header module="notifications" @click_event="action = 'create'; dialog = true;" :title="$t('label.notifications')" :items="breadcrumps" />
    <v-data-table
      :headers="headers"
      :items="notifications"
      class="elevation-4 mt-6"
      :footer-props="{itemsPerPageText: $t('table.recordsPerPage')}"
    >
      <template v-slot:item.send="{ item }">
        <v-btn @click="sendNotification(item)" :loading="item.send" class="text-capitalize secondary">
          {{$t('label.sendNotification')}}
        </v-btn>
      </template>
          <template v-slot:item.actions="{ item }">
      <v-menu
        bottom
        left
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item @click="action = 'update'; selectFields(item);" ripple>
            <v-list-item-title>
             <p class="mb-0 amber--text"><v-icon class="mr-1" color="amber" small>mdi-pencil</v-icon>{{$t('label.update')}}</p>
            </v-list-item-title>
            </v-list-item>
            <v-spacer></v-spacer>
            <v-list-item @click="id = item.id;; delete_alert = true;" ripple>
            <v-list-item-title>
             <p class="mb-0 error--text"><v-icon class="mr-1" color="error" small>mdi-delete</v-icon>{{$t('label.remove')}}</p>
            </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      width="600px"
  >
  <global-dialog-content :loading="loading" :action="action" title="notification" @submit="submit" @close_dialog="clear(); dialog = false;">
    <template v-slot:dialog-content>
      <v-form
        ref="form"
        class="form"
        v-model="valid"
        lazy-validation
       >
      <v-text-field
        v-model="item.title"
        ref="title"
        label="Title"
        outlined
        dense
        :rules="titleRules"
         required
      ></v-text-field>
            <v-text-field
        v-model="item.content"
        ref="content"
        label="Content"
        outlined
        dense
        :rules="contentRules"
         required
      ></v-text-field>
      </v-form>
    </template>
    </global-dialog-content>
    </v-dialog>
    <v-dialog
      v-model="delete_alert"
      width="350px"
    >
    <global-delete-alert @close="id = null; delete_alert = false;" @submit="deleteNotification(id), delete_alert = false;" />
    </v-dialog>
</v-col>
  
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { REQUEST } from '../../../Request';
import { GET, POST } from '../../../Request/requestMethods';
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
          text: this.$t('label.notifications'),
          disabled: true,
          href: 'notifications',
        },
      ],
          headers: [
          {
            text: this.$t('label.title'),
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { text: this.$t('label.content'), value: 'content', sortable: false},
          { text: this.$t('label.sendNotification'), value: 'send', sortable: false},
          { text: this.$t('label.action'), value: 'actions', sortable: false},
        ],
        id: null,
        action: "",
        item: {
          title: "",
          content: ""
        },
        dialog: false,
        delete_alert: false,
        loading: false,
        valid: false,
        titleRules: [v => !!v || 'Title is required!'],
        contentRules: [v => !!v || 'Content is required!']
        }
    },
    computed: {
      ...mapState('notificationStore', ['notifications'])
    },
     methods: {
      ...mapActions('notificationStore', ['getNotifications', 'createNotification', 'updateNotification', 'deleteNotification']),
        async sendNotification(item) {
            this.notifications[this.notifications.indexOf(item)].send = true;
            let payload = {
              title: this.notifications[this.notifications.indexOf(item)].title,
              content: this.notifications[this.notifications.indexOf(item)].content
            }
            try {
            await REQUEST('/notifications/send/notification', POST, payload);
            }catch(e) {
            this.notifications[this.notifications.indexOf(item)].send = false;
            }
            this.notifications[this.notifications.indexOf(item)].send = false;

        },
        selectFields(item) {
          this.id = item.id;
          this.item.title = item.title;
          this.item.content = item.content;
          this.dialog = true;
        },
        clear() {
          this.item.title = "";
          this.item.content = "";
        },
       async submit() {
         
          await this.$refs.form.validate()
          if(this.valid) {
            this.loading = true;
          if(this.action === 'create')
           await this.createNotification(this.item)
          else
           await this.updateNotification({id: this.id, body: this.item})

           this.dialog = false;
          }
          this.loading = false;
        },

        deleteNotif(id) {
          this.deleteNotification(id);
        }
    },
    mounted() {
      this.getNotifications();
    }
}
</script>

