<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar color="cyan" dark flat>
              <v-tabs centered>
                <v-tab to="/login">Login</v-tab>
                <v-tab to="/register">Register</v-tab>
              </v-tabs>
            </v-toolbar>
            <router-view></router-view>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>