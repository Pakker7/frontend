<template>
    <div>
        <h1>User!!!!!</h1>
        <p>유저번호 : {{ userId }} </p>

        <h1>그룹 {{ $route.query.group }} </h1>
        <h1>그룹 {{ $route.query.category }} </h1>
        <h1>그룹 {{ $route.query.name }} </h1>
        <h1>그룹 {{ $route.query.address }} </h1>

        query는 sql이 아님,
        query : 주소창에서 localhost:8080/userrrid?name="test"&address="seoul" 이렇게 전달 가능(GET)
        params : 값을 숨겨서 전달가능(POST)
    </div>
</template>

<script>

    export default {
        computed :{
            userId(){
                return this.$route.params.userId
            }
        },
        created() {
            console.log('router',this.$router); //router의 mode등 옵션 등 모든게 나옴
            console.log('route',this.$route); //router에 들어있는 object만 출력
        }
    }
</script>