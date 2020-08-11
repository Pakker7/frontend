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
        </v-list>
    </div>
</template>

<script>
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
            return {}
        },
    }
</script>

<style scoped>

</style>