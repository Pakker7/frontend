<template> <!--html코드라고 생각하면 됨-->
  <div>
    <h1>{{ title }}</h1>
    <p>{{ count }}</p>
    <button @click="count++">추가</button>
    <HomeComponent></HomeComponent>
  </div>
</template>

<script>
  import HomeComponent from './home' /*'./home.vue'라고 쓰는 것도 가능*/

  export default {
    components:{  /*위에 import 해준 .vue 파일을 사용할 수 있게 쓰는 행위 @Autowired와같음*/
      HomeComponent
    },
    data() {
      return {
        title:"hihi",
        count:1
      }
    }
  }
</script>
