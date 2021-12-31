import axios from 'axios'
require('dotenv').config()

export default() => {
  return axios.create({
    baseURL: 'https://health-tracker-rest-20075835.herokuapp.com/api',
    headers: {"Access-Control-Allow-Origin": "https://health-tracker-vue-20075835.herokuapp.com/"}
  })
}