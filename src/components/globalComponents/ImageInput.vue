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
          toast('Something went wrong!', 'error');
        }
        }
    },
    components: {
        PictureInput
    }
}
</script>
