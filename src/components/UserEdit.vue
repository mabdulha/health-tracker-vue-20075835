<template>
  <v-dialog v-model="dialog" width="750px" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary">
        Update User
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Update User
      </v-card-title>
      <v-card-text>
        <v-form ref="UpdateUserForm">
           <v-btn class="primary" @click="onFilePick"> Upload image </v-btn>
            <input
              type="file"
              @change="onUploadImage"
              style="display: none"
              accept="image/*"
              ref="fileinput"
            />
            <v-layout row>
              <v-flex class="pb-2" xs12 sm9>
                <img :src="user.avatar" height="150px" width="200px" class="my-7" />
              </v-flex>
            </v-layout>
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
        <v-btn @click="submit" dark color="primary"> Update User </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from '../services/userservice'
import { fb } from '../firebase'

export default {
  props: ['user', 'userid'],
  data () {
    return {
      inputcheck(propertyType) {
        return (v) =>
          v.trim().length > 0 || `You must provide a ${propertyType}`;
      },
      numbercheck(propertyType) {
        return (v) => v > 0 || `You must provide a valid ${propertyType}`;
      },
      minlen(propertyType, minlen) {
        return (v) =>
          v.trim().length >= minlen ||
          `${propertyType} must be atleast ${minlen} characters long`;
      },
      emailcheck(propertyType) {
        return (v) =>
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            v
          ) || `${propertyType} must be valid`;
      },
      dialog: false,
      genders: ["M", "F", "O"],
      value: true,
      value2: true,
      password: "",
      cpassword: ""
    }
  },
  methods: {
    onFilePick() {
      this.$refs.fileinput.click();
    },
    onUploadImage(e) {
      let file = e.target.files[0];
      console.log(file);
      let d = new Date();

      var storageRef = fb
        .storage()
        .ref("users/" + d.getTime() + "-" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("image url = " + downloadURL);
            this.user.avatar = downloadURL.toString();
            console.log(this.user.avatar);
          });
        }
      );
    },
    submit() {
      if (this.$refs.UpdateUserForm.validate()) {
        if (this.password == this.cpassword) {
          var user = {
            avatar: this.user.avatar,
            fname: this.user.fname,
            lname: this.user.lname,
            email: this.user.email,
            password: this.password,
            weight: this.user.weight,
            height: this.user.height,
            gender: this.user.gender,
            age: this.user.age
          }

          this.user = user
          this.updateUser(this.userid, user)
          this.dialog = false
        } else {
          console.log("Please Ensure the passwords both match");
        }
      }
    },
    updateUser (id, user) {
      UserService.updateUser(id, user).then((result) => {
        console.log(result)
        alert('User updated')
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>