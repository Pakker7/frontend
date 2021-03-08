import Vue from 'vue'
import Router from 'vue-router'
import Read from "./components/Read";
import Login from "./components/Login";


Vue.use(Router) // router를 사용하겠다..

export default new Router({ // 새로운 router만들어서 하단의 객체를 전달하겠다.
  mode: 'history', // 얘 주석처리하면 hash모드임
  // hash모드는 localhost:8080/#/about 이런식으로 #뒤가 uri임
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Read', //url과 component랑 연결하는 또하나의 alias?!?!
      component: Read //상단 import한거
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
