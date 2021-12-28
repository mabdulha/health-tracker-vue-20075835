import axios from 'axios'
require('dotenv').config()

export default() => {
  return axios.create({
    baseURL: 'http://localhost:8080/'
  })
}