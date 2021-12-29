<template>
  <div>
    <h1>Dashboard Homepage</h1>
    <p> {{ this.userCount }} </p>
  </div>
</template>

<script>
import UserService from '../services/userservice'

export default {
  data () {
    return {
      userCount: null
    }
  },
  mounted () {
    this.getDashboardData()
  },
  methods: {
    getDashboardData () {
      this.getUserCount()
    },
    getUserCount () {
      UserService.fetchUserCount().then((result) => {
        this.userCount = result.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>