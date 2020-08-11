<template>
    <div>
        <v-app>
            <div class="blue lighten-3 pa-3" style="padding-left:30px;">
                <h1>User 컴포넌트</h1>
                <p>이름 : {{ name }}</p>
                <div class="my-2">
                    <v-btn small color="error" @click="changeName()">이름 변경</v-btn>
                </div>
                <hr>
                <v-layout row wrap>
                    <v-flex xs12 sm6>  <!--v-bind :자식이 사용할 변수명 = "전달할 데이터 변수명"-->
                        <UserDetail2 v-bind:name="name"
                                     v-bind:address='address'
                                     v-bind:phone="phone"
                                     v-bind:hasDog="hasDog">
                        </UserDetail2>
                    </v-flex>
                    <v-flex>
                        <UserEdit2></UserEdit2>
                    </v-flex>
                </v-layout>
            </div>
        </v-app>
    </div>
</template>

<script>
    import UserEdit2 from "./UserEdit2";
    import UserDetail2 from "./UserDetail2";

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
            }
        },
    }
</script>
