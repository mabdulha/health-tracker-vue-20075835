import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.cyan.lighten2,
        navcolor: colors.cyan,
        secondary: colors.teal.lighten2,
        accent: colors.teal.accent3,
        background: colors.cyan.lighten5
      }
    }
  }
});
