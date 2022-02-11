<template>
<div>
  <div class="mt-6">
    <froala id="edit" :tag="'textarea'" :config="config" v-model="content"></froala>
    <div class="d-flex align-center justify-center mt-6">
      <v-btn 
      @click="updateTermsAndConditions" 
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
import { REQUEST } from '../Request';
import { GET, PUT } from '../Request/requestMethods'
export default{
    data() {
        return {
        content: '',
        id: null,
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
    methods: {
        test() {
            console.log(this.content);
        },
        async getTermsAndConditions() {
            let response = await REQUEST('/terms-and-conditions', GET);
            this.id = response.data.id;
            this.content = response.data.content.replaceAll('&lt;', '<');
            // this.currentContent = response.data.content.replaceAll('&lt;', '<');
        },
        async updateTermsAndConditions() {
            this.loading = true;
            let response = await REQUEST(`/terms-and-conditions/${this.id}`, PUT, {content: this.content});
            this.loading = false;
            this.getTermsAndConditions();
        }
    },
    mounted() {
        this.getTermsAndConditions();
    }
}
</script>

