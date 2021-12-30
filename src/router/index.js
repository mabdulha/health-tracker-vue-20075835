import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Login from '../components/LoginActivity.vue'
import Register from '../components/RegisterEditActivity.vue'
import Exercise from '../views/Exercise.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => 
      import('../views/Exercises.vue')
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => 
      import('../views/Ingredients.vue')
  },
  {
    path: '/meals',
    name: 'Meal',
    component: () => 
      import('../views/Meals.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => 
      import('../views/Profile.vue')
  },
  {
    path: "/exercises/:id/view",
    name: "exercise-view",
    component: Exercise
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
