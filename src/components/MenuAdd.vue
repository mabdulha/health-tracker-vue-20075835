<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ml-2" color="primary" dark>Add menu</v-btn>
    </template>
    <v-card>
      <v-card-title primary-title>
        Add new Menu
      </v-card-title>
      <v-card-text>
        <v-form ref="AddMenuForm">
          <v-btn class="primary" @click="onUploadImage">
            Upload image
          </v-btn>
          <input type="file" 
          @change="onUploadImage"
          style="display:none"
          accept="image/*"
          ref="fileinput" />
          <v-layout row>
            <v-flex class="pb-2" xs12 sm9>
              <img :src="image">
            </v-flex>
          </v-layout>
          <v-text-field outlined label="Name" v-model="name" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark color="primary" @click="submit">Add Menu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      name: '',
      image: ''
    }
  },
  methods: {
    submit () {}
  }
}
</script>