<template>
  <v-container>
    <v-card-text>
      <v-form>
        <v-text-field
          outlined
          label="Email"
          prepend-inner-icon="mdi-email"
          v-model="email"
          />
        <v-text-field
          outlined
          label="Password"
          prepend-inner-icon="mdi-lock"
          v-model="password"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn dark @click="submit" color="cyan">Login</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import AuthService from '../services/authservice'
import jwt_decode from 'jwt-decode'

export default {
  data () {
    return {
      email: null,
      password: null,
      value: true,
      token: null,
      user: {}
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.email,
        password: this.password
      }
      this.credentials = credentials
      this.login(credentials)
    },
    login: function (credentials) {
      AuthService.loginUser(credentials)
        .then((res) => {
          this.token = res.data
          var decode_token = jwt_decode(this.token)
          this.user = decode_token.User
          this.$store.dispatch('setToken', this.token)
          this.$store.dispatch('setUser', this.user)
          this.$router.push('/')
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>