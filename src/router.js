import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router) // router를 사용하겠다..

// 방법1. import About from './views/About'
// 방법2. 아래처럼 const로 선언
// 방법1과 방법2의 차이 방법 1은 이 router.js를 로딩시에
// 방법1로 로딩한 모든 컴포넌트를 가져오지만
// 방법2는 딱 사용할 때만 로딩함 부하를 줄일 수 있음
const About = () => {
  return import(/* webpackChunkName: "about" */ './views/About.vue');
}

const User = () =>{
  return import(/* webpackChunkName: "about" */ './views/User.vue');
}

export default new Router({ // 새로운 router만들어서 하단의 객체를 전달하겠다.
  mode: 'history', // 얘 주석처리하면 hash모드임
  // hash모드는 localhost:8080/#/about 이런식으로 #뒤가 uri임
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home', //url과 component랑 연결하는 또하나의 alias?!?!
      component: Home //상단 import한거
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited
      component: About
    },
    {
      /*뒤에 어떤 값이 들어와야만 이 페이지가 동작하는거임*/
      path : '/user/:userId', // :변수명
      name : 'user',
      component: User
    }
  ]
})
