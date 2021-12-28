require('dotenv').config()

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: 'http://localhost:7000/api',
  }
}
