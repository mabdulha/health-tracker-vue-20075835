import axios from 'axios'
require('dotenv').config()

export default() => {
  return axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://health-tracker-rest-20075835.herokuapp.com/api'
  })
}