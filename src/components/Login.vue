<template>
  <div class="row gutter items-center layout-padding" style="height: 100%">
    <div class="gt-md width-1of2"></div>
    <div class="card auto">
      <div class="card-title">
        Connexion
      </div>
      <div class="list">
        <div class="item two-lines">
          <i class="item-primary" style="top: 28px">account_circle</i>
          <div class="item-content">
            <div class="floating-label">
              <input
                required class="full-width"
                v-model="login"
                @blur="$v.login.$touch()"
                v-bind:class="{ 'has-error': $v.login.$error }">
              <label>Compte</label>
            </div>
          </div>
        </div>
        <div class="item two-lines">
          <i class="item-primary" style="top: 28px">lock</i>
          <div class="item-content">
            <div class="floating-label">
              <input
                required class="full-width"
                type="password"
                v-model="password"
                @blur="$v.password.$touch()"
                v-bind:class="{ 'has-error': $v.password.$error }">
              <label>Mot de passe</label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <q-progress-button
            indeterminate
            dark-filler
            :percentage="progress"
            class="primary raised pull-right"
            style="bottom: 5px"
            :class="{ 'disabled': $v.validationGroup.$invalid }"
            :disabled="$v.validationGroup.$invalid"
            @click.native="connect()">
          Go!
        </q-progress-button>
      </div>
    </div>
    <div class="gt-md width-1of2"></div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import api from '../api/api'

export default {
  data () {
    return {
      login: '',
      password: '',
      progress: 0
    }
  },
  validations: {
    login: {
      required
    },
    password: {
      required
    },
    validationGroup: ['login', 'password']
  },
  methods: {
    connect () {
      let self = this

      api.login(this.login, this.password)
      .then((response) => {
        self.progress = 101

        setTimeout(() => {
          self.progress = 0
        }, 500)

        let session = {
          auth: true,
          account: response.data.session.account,
          admin: response.data.session.admin,
          token: response.data.token
        }
        self.$router.replace('/home')
        self.$store.dispatch('setSession', session)
      })
      .catch((error) => {
        console.log(error)

        self.progress = -1

        setTimeout(() => {
          self.progress = 0
        }, 1000)
      })
    }
  }
}
</script>

<style>
</style>
