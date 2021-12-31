<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ml-2" color="primary" dark>Add Ingredient</v-btn>
    </template>
    <v-card>
      <v-card-title primary-title> Add Ingredient </v-card-title>
      <v-card-text>
        <v-form ref="AddIngredientForm">
          <v-btn class="primary mb-5" @click="onFilePick"> Upload image </v-btn>
          <input
            type="file"
            @change="onUploadImage"
            style="display: none"
            accept="image/*"
            ref="fileinput"
          />
          <v-layout row v-if="image != ''">
            <v-flex class="pb-2" xs12 sm9>
              <img :src="image" height="150px" width="200px" class="my-7" />
            </v-flex>
          </v-layout>
          <v-text-field
            outlined
            v-model="name"
            label="Name"
            :rules="[inputcheck('Name'), minlen('Name', 3)]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="g"
            v-model="energy"
            label="Energy"
            :rules="[inputcheck('Energy')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="calories"
            v-model="calories"
            label="Calories"
            :rules="[inputcheck('Calories')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="g"
            v-model="protein"
            label="Protein"
            :rules="[inputcheck('Protein')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="g"
            v-model="fat"
            label="Fat"
            :rules="[inputcheck('Fat')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="g"
            v-model="carbs"
            label="Carbs"
            :rules="[inputcheck('Carbs')]"
          />
          <v-text-field
            outlined
            type="number"
            suffix="mg"
            v-model="sodium"
            label="Sodium"
            :rules="[inputcheck('Sodium')]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark @click="submit" color="cyan">Add Ingredient</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb } from '../firebase'
import IngredientService from '../services/ingredientservice'

export default {
  data () {
    return {
      inputcheck(propertyType) {
        return (v) => v.length > 0 || `You must provide a ${propertyType}`;
      },
      minlen(propertyType, minlen) {
        return (v) =>
          v.length >= minlen ||
          `${propertyType} must be atleast ${minlen} characters long`;
      },
      dialog: false,
      image: '',
      name: '',
      energy: 0,
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      sodium: 0,
      ingredient: {}
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
        .ref("ingredients/" + d.getTime() + "-" + file.name);
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
            this.image = downloadURL.toString();
            console.log(this.image);
          });
        }
      );
    },
    submit() {
      if (this.$refs.AddIngredientForm.validate()) {
        if (this.image.length === 0) {
          this.image =
            "https://www.happyeater.com/images/default-food-image.jpg";
        }
        var ingredient = {
          name: this.name,
          image: this.image,
          energy: this.energy,
          calories: this.calories,
          protein: this.protein,
          fat: this.fat,
          carbs: this.carbs,
          sodium: this.sodium
        };
        this.ingredient = ingredient;
        console.log(ingredient);
      }
      this.submitIngredient(this.ingredient);
      this.dialog = false;
    },
    submitIngredient(ingredient) {
      IngredientService.addIngredient(ingredient)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
}
</script>