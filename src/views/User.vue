<template>
    <div>
        <v-flex x12>
            <h1>User!!!!!</h1>
            <p>유저를 검색해 주세요 </p>
        </v-flex>
        <v-flex x12>
            <v-text-field
                    v-model="userId"
                    label="유저 번호를 입력 하세요">
            </v-text-field>                     <!-- path를 쓰면 상대 경로를 생각하면서 해야함 -->
                                                <!-- name을 쓰면 params를 추가해 줘야함 -->
            <!--<v-btn @click="$router.push({path: `user/${userId}`})">검색</v-btn>-->
            <v-btn @click="$router.push({
                name: `users-detail`,
                params: {
                    id:userId
                }
            })">검색</v-btn>
        </v-flex>
        <v-flex>
            <router-view></router-view>
        </v-flex>
    </div>

</template>

<script>
    export default {
        data(){
          userId:null
        },
        computed :{
            userId(){
                return this.$route.params.userId
            }
        },
        beforeRouteEnter(to,from,next){ //접근 직전 동작
            // beforeRouteEnter 후 create 실행 됨
            next();
        },
        beforeRouteLeave(to, from,next){ // 떠나기 직전 동작
            // destroyed 후 beforeRouteLeave 실행됨
        },
        created() {
            console.log('router',this.$router); //router의 mode등 옵션 등 모든게 나옴
            console.log('route',this.$route); //router에 들어있는 object만 출력
        },
        destroyed() { // 페이지가 소멸될 때
        }
    }
</script>