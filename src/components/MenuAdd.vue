<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ml-2" color="primary" dark>Add Meal</v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Add new Meal
      </v-card-title>
      <v-card-text>
        <v-form ref="AddMealForm">
          <v-btn class="primary" @click="onFilePick">
            Upload image
          </v-btn>
          <input type="file" 
          @change="onUploadImage"
          style="display:none"
          accept="image/*"
          ref="fileinput" />
          <v-layout row>
            <v-flex class="pb-2" xs12 sm9>
              <img :src="image" height="150px" width="200px" class="my-7">
            </v-flex>
          </v-layout>
          <v-text-field outlined label="Name" v-model="name"  :rules="[inputcheck('Name'), minlen('Name', 3)]" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark color="primary" @click="submit">Add Meal</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb } from '../firebase'
import MealService from '../services/mealservice'

export default {
  data () {
    return {
      inputcheck (propertyType) {
        return v => v.trim().length > 0 || `You must provide a ${propertyType}`
      },
      minlen (propertyType, minlen) {
        return v => v.trim().length >= minlen || `${propertyType} must be atleast ${minlen} characters long`
      },
      dialog: false,
      name: '',
      image: '',
      userid: this.$store.state.user.id,
      meal: {}
    }
  },
  methods: {
    onFilePick () {
      this.$refs.fileinput.click()
    },
    onUploadImage (e) {
      let file = e.target.files[0]
      console.log(file)
      let d = new Date() 

      var storageRef = fb.storage().ref('meals/' + d.getTime() + '-' + file.name)
      let uploadTask = storageRef.put(file)

      uploadTask.on('state_changed', (snapshot) => {

      }, (err) => {
        console.log(err)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('image url = ' + downloadURL)
        this.image = downloadURL.toString()
        console.log(this.image)
      })
      })
    },
    submit () {
      if (this.$refs.AddMealForm.validate()) {
        if (this.image.length === 0) {
          this.image = 'https://www.happyeater.com/images/default-food-image.jpg'
        }
        var meal = {
          name: this.name,
          image: this.image,
          userId: this.userid
        }
        this.meal = meal
        console.log(meal)
      }
      this.submitMeal(this.meal)
      this.dialog = false
    },
    submitMeal (meal) {
      MealService.addMeal(meal).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>