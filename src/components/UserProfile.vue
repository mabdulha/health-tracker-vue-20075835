<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
        <v-flex>
          <v-card elevation-2>
            <v-container>
              <v-form ref="UserProfileForm">
                <h1 class="text-center my-2">User Profile</h1>
                 <v-text-field
                  outlined
                  disabled
                  label="First Name"
                  v-model="user.fname"
                  prepend-inner-icon="mdi-account"
                />
                <v-text-field
                  outlined
                  disabled
                  label="Last Name"
                  v-model="user.lname"
                  prepend-inner-icon="mdi-account"
                />
                <v-text-field
                  outlined
                  disabled
                  label="Email"
                  v-model="user.email"
                  prepend-inner-icon="mdi-at"
                />
                <v-text-field
                  outlined
                  disabled
                  label="Weight"
                  v-model="user.weight"
                  suffix="Kgs"
                  type="number"
                  min="0"
                  max="300"
                  prepend-inner-icon="mdi-scale-bathroom"
                />
                <v-text-field
                  outlined
                  disabled
                  label="Height"
                  v-model="user.height"
                  type="number"
                  suffix="cm"
                  min="0"
                  max="250"
                  prepend-inner-icon="mdi-human-male-height"
                />
                <v-autocomplete
                  outlined
                  disabled
                  label="Gender"
                  v-model="user.gender"
                  prepend-inner-icon="mdi-gender-male-female"
                />
                <v-slider
                  label="Age"
                  disabled
                  v-model="user.age"
                  color="cyan"
                  min="0"
                  max="100"
                  thumb-label
                  prepend-icon="mdi-baby-face-outline"
                />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <user-edit :user="user" :userid="user.id" />
              </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import UserService from '../services/userservice'
import UserEdit from './UserEdit.vue'

export default {
  components: {
    UserEdit
  },
  data () {
    return {
      user: {},
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
      })
    }
  }
}
</script>