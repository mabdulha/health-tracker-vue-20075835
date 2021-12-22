require('dotenv').config()

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: process.env.BASE_URL,
  }
}
