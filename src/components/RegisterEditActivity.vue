<template>
  <v-container>
    <v-card-text>
      <v-form ref="RegisterUserForm">
        <v-text-field
          outlined
          label="First Name"
          v-model="fname"
          prepend-inner-icon="mdi-account"
          :rules="[inputcheck('first name')]"
        />
        <v-text-field
          outlined
          label="Last Name"
          v-model="lname"
          prepend-inner-icon="mdi-account"
          :rules="[inputcheck('last name')]"
        />
        <v-text-field
          outlined
          label="Email"
          v-model="email"
          prepend-inner-icon="mdi-at"
          :rules="[inputcheck('email'), emailcheck('email')]"
        />
        <v-text-field
          outlined
          label="Password"
          v-model="password"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          prepend-inner-icon="mdi-lock"
          :rules="[inputcheck('password'), minlen('password', 6)]"
        />
        <v-text-field
          outlined
          label="Confirm Password"
          v-model="cpassword"
          :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value2 = !value2)"
          :type="value2 ? 'password' : 'text'"
          prepend-inner-icon="mdi-lock-check"
          :rules="[inputcheck('password'), minlen('password', 6)]"
        />
        <v-text-field
          outlined
          label="Weight"
          v-model="weight"
          suffix="Kgs"
          type="number"
          min="0"
          max="300"
          prepend-inner-icon="mdi-scale-bathroom"
          :rules="[numbercheck('weight')]"
        />
        <v-text-field
          outlined
          label="Height"
          v-model="height"
          type="number"
          suffix="cm"
          min="0"
          max="250"
          prepend-inner-icon="mdi-human-male-height"
          :rules="[numbercheck('height')]"
        />
        <v-autocomplete
          outlined
          label="Gender"
          :items="genders"
          v-model="gender"
          selected="Male"
          prepend-inner-icon="mdi-gender-male-female"
        />
        <v-slider 
        label="Age"
        v-model="age"
        color="cyan"
        min="0"
        max="100"
        thumb-label
        prepend-icon="mdi-baby-face-outline"
        :rules="[numbercheck('age')]"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn dark @click="submit" color="cyan">Register</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import AuthService from '../services/authservice'
import jwt_decode from 'jwt-decode'

export default {
  data () {
    return {
      inputcheck (propertyType) {
        return v => v.trim().length > 0 || `You must provide a ${propertyType}`
      },
      numbercheck (propertyType) {
        return v => v > 0 || `You must provide a valid ${propertyType}`
      },
      minlen (propertyType, minlen) {
        return v =>
          v.trim().length >= minlen ||
          `${propertyType} must be atleast ${minlen} characters long`
      },
      emailcheck (propertyType) {
        return v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v) || `${propertyType} must be valid`
      },
      genders: ["Male", "Female", "Other"],
      fname: '',
      lname: '',
      email: '',
      password: '',
      cpassword: '',
      weight: null,
      height: null,
      gender: "Male",
      age: null,
      value: true,
      value2: true,
      user: {}
    }
  },
  methods: {
    submit () {
      if (this.$refs.RegisterUserForm.validate()) {
        if (this.password == this.cpassword) {
          var user = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password,
            weight: this.weight,
            height: this.height,
            gender: this.gender.charAt(0),
            age: this.age
          }

          this.user = user
          this.submitUser(this.user)

        } else {
          console.log("Please Ensure the passwords both match")
        }
      }
    },
    submitUser: function (user) {
      AuthService.registerUser(user)
      .then(res => {
        const credentials = {
          email: user.email,
          password: user.password
        }
        this.credentials = credentials
        this.login(this.credentials)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    login: function (credentials) {
      AuthService.loginUser(credentials)
        .then(res => {
          this.token = res.data
          var decode_token = jwt_decode(this.token)
          this.user = decode_token.User
          this.$store.dispatch('setToken', this.token)
          this.$store.dispatch('setUser', this.user)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>