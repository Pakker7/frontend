<template>
    <div class="yellow lighten-3 pa-3">
        <h3>회원 정보를 수정 할 수 있습니다.</h3>
        <p>수정 사항</p>
        <v-text-field
                label="이름"
                v-model="user.name"
        ></v-text-field> <!--v-model이라고 하면 field안에 들어가는듯?-->
        <!--v-model="name" 라고 하면 부모에서 받아온 data를 바로 수정하는거라 f12에서 에러 메세지가 뜸-->
        <v-text-field
                label="주소"
                v-model="user.address"
        ></v-text-field>
        <v-text-field
                label="번호"
                v-model="user.phone"
        ></v-text-field>
        <v-radio-group v-model="user.hasDog">
            <v-radio
                label="반려견 있음"
                :value="true"
            ></v-radio>
            <v-radio
                label="반려견 없음"
                :value="false"
            ></v-radio>
        </v-radio-group>
        <v-btn @click="changeUser()">수정 완료</v-btn>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    import {dateFormat} from "../mixins/dateFormat";
    // 보통의.vue파일을 import 할떄는 이렇게 쓰는데 main.js의 eventBus는 다른가봄
    //import UserEdit2 from "./UserEdit2";

    export default {
        props:['name','address','phone','hasDog'],
        data(){
            return{
                user:{} //user object를 선언해줌 아래보다 먼저 실행되나보네..?!
            }
        },
        created() {
            this.user.name = this.name
            this.user.address = this.address
            this.user.phone = this.phone
            this.user.hasDog = this.hasDog
        },
        methods:{
            /*changeData(){
                this.$emit("child", this.user); //신호 명
            },               //child라는 함수가 실행되는데 파라미터로 user를 넣는거임*/
            changeUser(){
                this.$emit("child", this.user);
                //eventBus.$emit("userWasEdited", new Date()); //eventbus를 사용하여 userWasEdited 라는 함수를 실행하는데 parameter로 Date()를 보냄
                eventBus.userWasEdited(new Date());
            }
        },
        mixins:[dateFormat]
    }
</script>

<style scoped>

</style>