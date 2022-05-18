<template>
<div class="parent">
<div class="container">
</div>
<div class="login-card-parent flex">
<v-card color="secondary" class="form-container">
  <div class="text-center">
  <h3>Log in to access dashboard</h3>
  </div>
  <v-form
    ref="form"
    class="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      @keydown.enter="login"
      :rules="emailRules"
      v-model="email"
      color="primary"
      label="E-mail"
      outlined
      rounded
      required
      type="email"
      dense
      autofocus
    ></v-text-field>

    <v-text-field
      @keydown.enter="login"
      :rules="passwordRules"
      v-model="password"
      color="primary"
      label="Password"
      type="password"
      outlined
      rounded
      dense
      required
    ></v-text-field>

    <v-btn
      color="primary"
      class="mr-4"
      @click="login"
      :loading="loading"
    >
      Login
    </v-btn>

  </v-form>
  </v-card>
  </div>
</div>

</template>
<script>
import { mapActions } from 'vuex';
import {toast} from '../utils/toast'
export default {
  data () {
    return {
      email: 'admin@test.com',
      password: '11111111',
      loading: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required!',
        v => /.+@.+/.test(v) || 'E-mail must be valid!',
      ],
      passwordRules: [
        v => !!v || 'Password is required!',
      ],
    }
  },
  methods: {
    ...mapActions('authStore', ['signIn']),
    async login() {
      await this.$refs.form.validate();
      if(this.valid){
        this.loading = true;
        try{
        await this.signIn(
          {
          email: this.email,
          password: this.password
          }
        );
        }catch(err){
          toast(this.$t('somethingWrong'), 'error');
          this.loading = false
        }
      this.loading = false;
      }
    },
  },
}
</script>
<style scoped>
.parent {
  display: flex;
  justify-content: center;
  background-color: #6D4C41;
}

img {
  padding:5px;
}

.container {
  position: absolute;
  height:100%;
  width: 100%
}

.login-card-parent {
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100vh;
}

.form-container {
  width:30%;
  background-color: white;
  padding: 30px;
}

.form {
  padding: 15px;
}

@media (min-width: 960px){
.container {
    max-width: 100%;
}
}

@media (max-width: 1170px){
  .form-container {
    width: 40%;
}
}

@media (max-width: 884px){
  .form-container {
    width: 50%;
}
}

@media (max-width: 768px){
  .form-container {
    width: 75%;
}
}

@media (max-width: 480px){
  .form-container {
    width: 90%;
}
}

.input > .v-input__slot{
  background: red !important;
}
</style>
