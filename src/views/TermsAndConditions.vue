<template>
<div>
  <global-header module="term & condition" title="Terms and Conditions" :items="breadcrumps" />
  <div class="mt-6">
    <vue-editor 
    @input.capture="update"
    v-model="content"
    ></vue-editor>
    <div class="d-flex align-center justify-center mt-6">
      <v-btn 
      :loading="loading" 
      @click="updateTermsAndConditions" 
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
          text: 'Terms and Conditions',
          disabled: true,
          href: 'termsandconditions',
        },
      ],
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
        async getTermsAndConditions() {
            let response = await REQUEST('/terms-and-conditions', GET);
            this.id = response.data.id;
            this.content = response.data.content.replaceAll('&lt;', '<');
            this.currentContent = response.data.content.replaceAll('&lt;', '<');
            this.update();
        },
        async updateTermsAndConditions() {
            this.loading = true;
            let response = await REQUEST(`/terms-and-conditions/${this.id}`, PUT, {content: this.content});
            this.loading = false;
            this.getTermsAndConditions();
        }
      },
     async mounted() {
       await this.getTermsAndConditions();
      }
}
</script>

