<template> <!--html코드라고 생각하면 됨-->
  <div> <!-- root 요소로 꼬옥 있어야 하고 root가 여러개면 에러남 -->
    <h1>{{ title }}</h1>
    <p>{{ count }}</p>
    <button @click="count++">추가</button>
    <HomeComponent></HomeComponent>

    <div class="blue lighten-3 pa-3" style="padding-left:30px;">
      <h1>User 컴포넌트</h1>
      <p>이름 : {{ name }}</p>
      <div class="my-2">
        <v-btn small color="error" @click="changeName()">이름 변경</v-btn>
      </div>
      <hr>
      <v-layout row wrap>
        <v-flex xs12 sm6>  <!--v-bind :자식이 사용할 변수명 = "전달할 데이터 변수명"-->
          <UserDetail v-bind:nameOfChild="name"
                      v-bind:numberOfChild="1"
                      v-bind:objectOfChild="{code:1, value:'test'}">
          </UserDetail>
        </v-flex>
        <v-flex>
          <UserEdit></UserEdit>
        </v-flex>
      </v-layout>
    </div>

  </div>
</template>

<script>
  import HomeComponent from './home' /*'./home.vue'라고 쓰는 것도 가능*/
  import UserEdit from "./components/UserEdit";
  import UserDetail from "./components/UserDetail";

  export default {
    components:{
      UserDetail,  /*위에 import 해준 .vue 파일을 사용할 수 있게 쓰는 행위 @Autowired와같음*/
      HomeComponent,
      UserEdit
    },
    data() {
      return {
        title:"hihi",
        count:1,
        name:"뷰 js"
      }
    },
    methods:{
      changeName() { //changeName = function () 과 동일
        this.name="hohoho"
      }
    }
  }
</script>
