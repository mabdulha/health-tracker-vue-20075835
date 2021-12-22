<template>
  <div id="navbar">
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list dense>
        <v-list-item @click.stop="drawer=!drawer" v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="navcolor"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer=!drawer" />
      <v-toolbar-title dark>
        <router-link to="/" custom v-slot="{navigate}">
        <header @click="navigate">
          <span>Health</span>
          <span class="font-weight-bold">Tracker</span>
        </header>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!$store.state.isLoggedIn">
        <v-btn text v-for="button in buttons" :key="button.route" :to="button.route">
        <span>
          {{ button.text }}
        </span>
        <v-icon right>
          {{ button.icon }}
        </v-icon>
        </v-btn>
      </v-toolbar-items>
      <div v-if="$store.state.isLoggedIn">
        <span class="font-weight-bold">
          Welcome back, {{ $store.state.user.fname }}
        </span>
        <v-btn left text dark @click="logout">
        <span>
          logout
        </span>
        <v-icon right>
          mdi-logout
        </v-icon>
      </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
   data: () => ({
    drawer: false,
    buttons: [
      { icon: 'mdi-login', text: 'Login', route: '/login' },
      { icon: 'mdi-account-box', text: 'Register', route: '/register' }
    ],
    links: [
      { icon: 'mdi-home', text: 'Home', route: '/' },
      { icon: 'mdi-information', text: 'About', route: '/about' },
      { icon: 'mdi-weight-lifter', text: 'Exercises', route: '/exercises' },
      { icon: 'mdi-account', text: 'Users', route: '/users' }
    ]
  }),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      } else {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
  .v-toolbar__title {
    cursor: pointer;
  }
  .v-toolbar__title:hover {
    color: #e4fdfb;
  }
</style>