import firebase from '@firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD8ubqtcY1fObcYum7WusSqPxBXlVgatY4",
  authDomain: "health-tracker-app-b8e3d.firebaseapp.com",
  projectId: "health-tracker-app-b8e3d",
  storageBucket: "health-tracker-app-b8e3d.appspot.com",
  messagingSenderId: "899269262293",
  appId: "1:899269262293:web:ecaf0ba0e6603837d6db5c",
  measurementId: "G-WE3ZTV3WXP"
}

const fb = firebase.initializeApp(firebaseConfig)

export { fb }