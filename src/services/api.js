import axios from 'axios'
require('dotenv').config()

export default() => {
  return axios.create({
    baseURL: process.env.BASE_URL
  })
}