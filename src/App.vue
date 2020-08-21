<template>
  <div>
    <v-app>
      <!--할 것
      자식 component에서 변수 수정하면 부모 변수도 바뀌고 그 바뀐 것을 제3자 component에서 출력 해줌-->
      <div class="blue lighten-3 pa-3" style="padding-left:30px;">
        <h1>User 컴포넌트</h1>
        <p>이름 : {{ name }}</p>
        <p>수정날짜 : {{ getDateAndTime(createAt) }}</p> <!--//mixin은 여기서 선언된 함수 마냥 function. 이런거 쓸필요 없이 바로 쓸수 있다.-->
        <div class="my-2">  <!--if(getDateAndTime same function in here) 이안에 있는게 첫번째로 실행 그담에 minin 그담에 연결된 형제 컴포넌트에 있는 minin이 출력됨-->
                              <!--오버 라이딩이 가능한건가.....?!-->
          <v-btn small color="error" @click="changeName()">이름 변경</v-btn>
        </div>
        <hr>
        <v-layout row wrap>
          <v-flex xs12 sm6>  <!--v-bind :자식이 사용할 변수명 = "전달할 데이터 변수명"-->
            <UserDetail2 v-bind:name="name"
                         v-bind:address='address'
                         v-bind:phone="phone"
                         v-bind:hasDog="hasDog"
            ></UserDetail2>
          </v-flex>
          <v-flex>
            <UserEdit2 v-bind:name="name"
                       v-bind:address='address'
                       v-bind:phone="phone"
                       v-bind:hasDog="hasDog"
                       @child="parents"
            ></UserEdit2> <!-- 당황.. 함수라고 parents 뒤에 () 붙이면 안됨..-->
          </v-flex>       <!--child라는 신호가 왔을때 parents 라는 함수를 실행해줘! 라는 뜻임-->
        </v-layout>
      </div>
    </v-app>
  </div>
</template>

<script>
  import UserEdit2 from "./components/UserEdit2";
  import UserDetail2 from "./components/UserDetail2";
  import {dateFormat} from "./mixins/dateFormat";
  /*import {eventBus} from "./main"; // 참고로 안쓰는데 import해두면 에러남...........;; */

  export default {
    components: {
      UserDetail2,
      UserEdit2
    },
    data() {
      return {
        name: "pakker",
        address: 'seoul',
        phone: "010-0000-0000",
        hasDog: true,
        createAt:null
      }
    },
    methods:{
      parents(user){
        this.name= user.name;
        this.address= user.address;
        this.phone= user.phone;
        this.hasDog= user.hasDog;
        console.log('부모가 받았어!');
      }
    },
    created() {
      this.createAt = new Date();
    },
    mixins : [dateFormat]
  }
</script>
