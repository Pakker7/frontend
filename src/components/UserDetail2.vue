<template>
    <div class="red lighten-3 pa-3">
        <h3>자세한 회원 정보를 확인 합니다.</h3>
        <v-list>
            <v-list-item-title>
                <v-list-item-content>이름 :</v-list-item-content>
                <v-list-item-content>{{name}}</v-list-item-content>
            </v-list-item-title>
            <v-list-item-title>
                <v-list-item-content>주소 :</v-list-item-content>
                <v-list-item-content>{{address}}</v-list-item-content>
            </v-list-item-title>
            <v-list-item-title>
                <v-list-item-content>번호 :</v-list-item-content>
                <v-list-item-content>{{phone}}</v-list-item-content>
            </v-list-item-title>
            <v-list-item-title>
                <v-list-item-content>멍멍이 여부 :</v-list-item-content>
                <v-list-item-content>{{hasDogKr}}</v-list-item-content>
            </v-list-item-title>
            <v-list-item-title>
                <v-list-item-content>수정 일자:</v-list-item-content>
                <v-list-item-content>{{ getDateAndTime(editedData) }}</v-list-item-content>
            </v-list-item-title>
        </v-list>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    import {dateFormat} from "../mixins/dateFormat";

    export default {
        props: {
            name: {
                type: String,
                require: true
            },
            address: {
                type: String,
                default: '값이 없음'
            },
            phone: {
                type: String,
                default: '값이 없음'
            },
            hasDog: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            hasDogKr() {
                return this.hasDog === true ? '있음' : '없음'
            }
        },
        data() {
            return {
                editedData:null// null로 일단 선언 후 아래에서 값 넣어줌
            }
        }, /*created는 처음에 생성해주는거?를 뜻하는듯함.. document ready같은건가?*/
        created() { /*$on = 이벤트 리스너 역할, open해두며 기다리고 있다가 userWasEdited 라는게 나타나면, 그때 실행한다는거*/
            eventBus.$on('userWasEdited', date =>{
               this.editedData = date;
            });
        },
        mixins:[dateFormat]
    }
</script>

<style scoped>

</style>