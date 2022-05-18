<template>
<div>
  <global-header module="blogs" @click_event="action='create'; open = true; dialog = true;" :title="$t('label.blogs')" :items="breadcrumps" />
        <div class="d-flex flex-column align-center">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="3"
            v-if="loading && blogs.length === 0"
          ></v-progress-linear>
      <div v-if="!loading && blogs.length === 0" class="d-flex flex-column align-center">
       <p class="mb-0">{{$t('table.noData')}}</p>
       <v-btn text rounded @click="action='create'; open = true; dialog = true;" class="text-capitalize mt-2" color="primary">
         {{$t('label.create') + ' ' + $t('label.blogs')}}
       </v-btn>
        </div>
   </div>
  <div class="mt-6">
    <v-row>
      <v-col
        v-for="blog in blogs"
        :key="blog.id"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
      <blog-grid 
      :blog="blog"
      @show_blog="
      blogToShow.title = blog.title; 
      blogToShow.content = blog.content;
      blogToShow.attachment = blog.attachment;
      show = true;
      "
      @show_delete_alert="open_delete_alert(blog.id)"
      @show_edit_dialog="open_edit_dialog(blog);"
      @show_delete_blog_image_alert="id = blog.id; delete_alert_2 = true;"
      />
      </v-col>
    </v-row>
  </div>
    <v-dialog
      v-model="dialog"
      width="600px"
  >
  <global-dialog-content :action="action" title="blog" @submit="submit" @close_dialog="clear(); dialog = false;">
    <template v-slot:dialog-content>
        <v-form
        ref="form"
        class="form"
        v-model="valid"
        lazy-validation
       >
      <v-text-field
        v-model="blog.title"
        ref="title"
        label="Title (required)"
        outlined
        dense
        :rules="titleRules"
         required
      ></v-text-field>
      <image-input v-if="open" @change_image="change_image" />
      <v-textarea
          v-model="blog.content"
          ref="content"
          outlined
          class="mt-6"
          label="Content"
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
  <show-blog :blog="blogToShow" @close_dialog="show = false;" />
  </v-dialog>
    <v-dialog
      v-model="delete_alert_1"
      width="350px"
  >
   <global-delete-alert @close="delete_alert_1 = false;" @submit="deleteBlog(id); delete_alert_1 = false;" />
    </v-dialog>
      <v-dialog
      v-model="delete_alert_2"
      width="350px"
  >
   <global-delete-alert @close="delete_alert_2 = false;" @submit="deleteBlogImage(id); delete_alert_2 = false;" />
    </v-dialog>
</div>
</template>
<script>
import BlogGrid from '../components/BlogGrid.vue';
import ShowBlog from '../components/ShowBlog.vue';
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
          text: this.$t('label.blogs'),
          disabled: true,
          href: 'blogs',
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
      blog: {
        title: '',
        image: null,
        content: ''
      },
      blogToShow: {
        title: '',
        attachment: null,
        content: ''
      },
      titleRules:[
        v => !!v || 'Title is required!',
      ],
      contentRules: 
       [
        v => !!v || 'Content is required!',
       ]
      }
    },
    computed: {
      ...mapState('blogStore', ['blogs'])
    },
    components: {
      BlogGrid,
      ShowBlog,
    },
    methods: {
      ...mapActions('blogStore', ['getBlogs', 'createBlog', 'updateBlog', 'deleteBlog', 'deleteBlogImage']),
       async submit() {
          await this.$refs.form.validate();
          if(this.valid) {
            this.dialog = false;
            if(this.dataURI){
            this.blog.image = await dataURItoBlob(this.dataURI);
            }

            let form = new FormData();
            form.append('title', this.blog.title);
            form.append('content', this.blog.content);
            if(this.dataURI){
            form.append('attachment', this.blog.image);
            }
            if(this.action === 'create'){
            await this.createBlog(form);
            toast('Blog created successfully', 'success');
            }else{
            await this.updateBlog({id: this.id, body: form});
            toast('Blog updated successfully', 'success');
            }
            this.clear();
          }
        },
        open_edit_dialog(blog) {
            this.action = 'edit';
            this.id = blog.id;
            this.blog.title = blog.title;
            this.blog.content = blog.content;
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
            this.blog.title = '';
            this.blog.content = '';
            this.blog.image = null;
            setTimeout(() => {
            this.open = false;
            }, 500);
        }
    },
    async mounted() {
      this.loading = true;
      await this.getBlogs();
      this.loading = false;
    }
}
</script>

