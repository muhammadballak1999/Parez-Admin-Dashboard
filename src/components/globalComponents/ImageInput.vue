<template>
    <picture-input 
      ref="pictureInput"
      width="300" 
      height="300" 
      margin="16" 
      accept="image/jpeg,image/png" 

      size="10" 
      button-class="btn"
      :removable="true"
      removeButtonClass="btn"
      :custom-strings="{
        upload: '<h1>+</h1>',
        drag: '<h1>+</h1>'
      }"
      @change="onChange">
    </picture-input>
</template>
<script>
import PictureInput from 'vue-picture-input';
import {toast} from '../../utils/toast'
export default {
    methods: {
        onChange (image) {
        if (image) {
          this.$emit('change_image', image);
        } else {
          toast(this.$t('somethingWrong'), 'error');
        }
        }
    },
    components: {
        PictureInput
    }
}
</script>
