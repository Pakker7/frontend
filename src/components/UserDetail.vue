<template>
    <div class="red lighten-3 pa-3">
        <h3>자세한 회원 정보를 확인 합니다.</h3>
        <p>{{ nameOfChild }}</p>
        <p>{{ numberOfChild }}</p>
        <p>{{ objectOfChild.code }}</p>
        <p>{{ objectOfChild.value }}</p>
        <p>{{ sayHello1() }}</p>
        <p>{{ sayHello1 }}</p> <!--method는 ()없으면 안되는듯-->
        <p>{{ sayHelloComputed }}</p> <!-- computed는 됨 변수 같은걸로 인식되는듯?-->
        <p>{{ sayHello2(numberOfChild) }}</p>
    </div>
</template>

<script>
    export default {
        //props : ['nameOfChild', 'numberOfChild','objectOfChild'], // 부모 데이터를 받아온다는 선언
        // 특이하게 array 형태로도 쓸수 있음

        //props 가 많기 때문에 type에 안맞게 쓸수 있어서 기록해 둔다고 함
        //잘못 기록시 f12 console에 나옴
        props: {
            nameOfChild : {
                type : String,
                //require : true,   //부모 component에서 꼭 전달해줘야 하면 이 옵션 사용
                default : "LEGO"    //부모 component에서 안보낼 시 default 값 선언 가능
            },
            numberOfChild : Number, //Integer 대신 number인듯..?
            objectOfChild : Object
        },

        data(){
            return{
                age: 30
            }
        },
        computed:{
            sayHelloComputed(){
                return this.objectOfChild.value + ' computed임';
            }
        },
        methods :{
            sayHello1(){
                //this로 여기에 있는 모든 변수 접근 가능한듯?
              return this.objectOfChild.value + '안녕하세요';
            },
            sayHello2(num){
                return  num + '안녕하세여';
            }
        }

        // method 와 computed 차이
        // 사실 이해가 잘안감
        // https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EA%B3%84%EC%82%B0%EB%90%9C-%EC%86%8D%EC%84%B1-vuejs-instance-computed-93cb6ad7dca9


    }
</script>

<style scoped>

</style>