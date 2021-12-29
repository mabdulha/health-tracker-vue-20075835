<template>
  <v-main>
    <v-container grid-list xs>
      <v-layout row wrap>
        <v-flex xs12 lg7>
          <v-card elevation-2>
            <v-container>
            <h1>Edit Profile</h1>
              <v-form ref="UpdateUserForm">
                <v-text-field
                  outlined
                  label="First Name"
                  v-model="user.fname"
                  prepend-inner-icon="mdi-account"
                  :rules="[inputcheck('first name')]"
                />
                <v-text-field
                  outlined
                  label="Last Name"
                  v-model="user.lname"
                  prepend-inner-icon="mdi-account"
                  :rules="[inputcheck('last name')]"
                />
                <v-text-field
                  outlined
                  label="Email"
                  v-model="user.email"
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
                  v-model="user.weight"
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
                  v-model="user.height"
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
                  v-model="user.gender"
                  selected="Male"
                  prepend-inner-icon="mdi-gender-male-female"
                />
                <v-slider 
                label="Age"
                v-model="user.age"
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
              <v-btn dark @click="submit" color="cyan">Update</v-btn>
            </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 lg4 offset-1>
          <v-card elevation-2>
            <h1>Preview</h1>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import UserService from '../services/userservice'


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
      user: {},
      password: '',
      cpassword: '',
      value: true,
      value2: true
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      UserService.fetchUser(this.$store.state.user.id).then((result) => {
        this.user = result.data
        console.log(this.user)
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>