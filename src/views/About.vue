<template>
<div>
  <global-header module="about" title="About" :items="breadcrumps" />
  <div class="mt-6">
    <froala @input.capture="update" id="edit" :tag="'textarea'" :config="config" v-model="content"></froala>
    <div class="d-flex align-center justify-center mt-6">
      <v-btn 
      :loading="loading" 
      @click="updateAbout" 
      :disabled="!isUpdated" 
      rounded 
      class="text-capitalize mb-4" 
      color="primary">
        Submit
      </v-btn>
    </div>
  </div>
</div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { REQUEST } from '../Request';
import { GET, PUT } from '../Request/requestMethods'
export default{
    data() {
        return {
        id: null,
        isUpdated: false,
        loading: false,
        content: '',
        currentContent: '',
        breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'About',
          disabled: true,
          href: 'about',
        },
      ],
      config: {
        pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontAwesome', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageTUI', 'imageManager', 'inlineStyle', 'inlineClass', 'lineBreaker', 'lineHeight', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'table', 'url', 'video', 'wordPaste'],
        events: {
          initialized: function () {
            console.log('initialized')
          },
        "image.beforeUpload": function(files) {
        var editor = this;
        if (files.length) {
            // Create a File Reader.
            var reader = new FileReader();
            // Set the reader to insert images when they are loaded.
            reader.onload = function(e) {
            var result = e.target.result;
            editor.image.insert(result, null, null, editor.image.get());
            };
            // Read image as base64.
            reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        // Stop default upload chain.
        return false;
        }
            }
      },
        }
    },
    components: {
      VueEditor
    },
    methods: {
        update() {
          setTimeout(() => {
            if(this.content !== this.currentContent)
            this.isUpdated = true;
            else
            this.isUpdated = false;
          }, 100);
        },
        async getAbout() {
            let response = await REQUEST('/about', GET);
            this.id = response.data.id;
            this.content = response.data.content.replaceAll('&lt;', '<');
            this.currentContent = response.data.content.replaceAll('&lt;', '<');
            this.update();
        },
        async updateAbout() {
            this.loading = true;
            let response = await REQUEST(`/about/${this.id}`, PUT, {content: this.content});
            this.loading = false;
            this.getAbout();
        }
      },
     async mounted() {
       await this.getAbout();
      }
}
</script>

