<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon color="secondary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Edit Exercise </v-card-title>
        <v-card-text>
          <v-form ref="EditExerciseForm">
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
                <img :src="editedImage" height="150px" width="200px" class="my-7" />
              </v-flex>
            </v-layout>
            <v-text-field
              outlined
              v-model="editedName"
              label="Name"
              :rules="[inputcheck('Name'), minlen('Name', 3)]"
            />
            <v-text-field
              outlined
              v-model="editedDescription"
              label="Description"
              :rules="[inputcheck('Description'), minlen('Description', 3)]"
            />
            <v-text-field
              outlined
              v-model="editedMuscle"
              label="Target Muscle"
              :rules="[inputcheck('Target Muscle'), minlen('Target Muscle', 3)]"
            />
            <v-text-field
              outlined
              type="number"
              suffix="calories"
              v-model="editedCalories"
              label="Calories Burnt"
              :rules="[inputcheck('Calories Burnt')]"
            />
            <v-text-field
              outlined
              type="number"
              suffix="mins"
              v-model="editedDuration"
              label="Duration"
              :rules="[inputcheck('Duration')]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn dark @click="submit" color="cyan">Edit Exercise</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { fb } from '../firebase'
import ExerciseService from "../services/exerciseservice";

export default {
  props: ['exercise', 'exerciseid'],
  data() {
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
      editedImage: this.exercise.image,
      editedName: this.exercise.name,
      editedDescription: this.exercise.description,
      editedMuscle: this.exercise.muscle,
      editedCalories: this.exercise.calories,
      editedDuration: this.exercise.duration
    };
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
        .ref("exercises/" + d.getTime() + "-" + file.name);
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
            this.editedImage = downloadURL.toString();
            console.log(this.editedImage);
          });
        }
      );
    },
    submit() {
      if (this.$refs.EditExerciseForm.validate()) {
        if (this.editedImage.length === 0) {
          this.editedImage =
            "https://www.happyeater.com/images/default-food-image.jpg";
        }
        var exercise = {
          name: this.editedName,
          image: this.editedImage,
          description: this.editedDescription,
          calories: this.editedCalories,
          muscle: this.editedMuscle,
          duration: this.editedDuration
        };
        this.exercise = exercise;
        console.log(exercise);
      }
      this.updateExercise(this.exerciseid, this.exercise);
      this.dialog = false;
    },
    updateExercise(id, exercise) {
      ExerciseService.updateExercise(id, exercise)
        .then((result) => {
          console.log(result);
           this.$swal.fire({
            position: 'top-end',
            type: 'success',
            text: 'Exercise Updated Successfully',
            timer: 10000
          })
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
