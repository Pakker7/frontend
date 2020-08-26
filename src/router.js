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
const Users = () => import(/* webpackChunkName: "users-detail" */ './views/UsersDetail.vue');

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
      component: About
    },
    {
      /*뒤에 어떤 값이 들어와야만 이 페이지가 동작하는거임*/
      path : '/user', // :변수명
      name : 'user',
      // beforeEnter:(to, from, next)=>{
      //   console.log('to: '+ to); //어디로?
      //   console.log('from: '+ from); // 어디서?
      //   next() // 이걸 해줘야 to로 넘어감
      //   //next('about') 이렇게 걸어서 조건에 따른 라우터의 접근을 조절 가능
      // },
      component: User,
      children:[
        {
          path: ":id",
          name: "users-detail",
          component: Users
        }
      ]
    }
  ]
})
