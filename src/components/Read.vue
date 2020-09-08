<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <template>
                    <div class="text-lg-right">
                        <v-btn dark class="mb-2">New Item</v-btn>
                    </div>
                </template>
                <v-data-table
                        :headers="headers"
                        :items="date">
                    <template slot="items" slot-scope="props">
                        <td :class="headers[0].class">{{ props.item.no }}</td>
                        <td :class="headers[1].class">{{ props.item.title }}</td>
                        <td :class="headers[2].class">{{ props.item.writer }}</td>
                        <td :class="headers[3].class">{{ props.item.createDate }}</td>
                        <td>
                            <div class="icon-space">
                                <v-icon>fas fa-edit</v-icon>
                            </div>
                            <div class="icon-space">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </div>
                        </td>

                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
//import data from '../data/index.js'
import axios from 'axios' //ajax 같은 통신 라이브러리

export default {
    data () {
        return {
            date: [],
            headers: [
                { text: 'no',   value: 'no', sortable: false ,align: 'center'},
                { text: 'title',  value: 'title', sortable: true ,align: 'center'},
                { text: 'writer', value: 'writer', sortable: true ,align: 'center'},
                { text: 'createDate',  value: 'createDate', sortable: true ,align: 'center'},
                { text: 'action',  value: 'action', sortable: false ,align: 'center'}
            ]
        }
    },
    created () {           // 초기화 함수를 정의 한다.
        // this.date = [
        //     { no : 1, title: '제목1', writer:'작성자1' ,createDate: '2020.09.01 09:35', action : 'icon'},
        //     { no : 2, title: '제목2', writer:'작성자2' ,createDate: '2020.09.01 09:34', action : 'icon'}
        // ]
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            const baseURI = 'http://127.0.0.1:9000/api/selectList';
            axios.get(baseURI, {
                /*params: { title: '타이틀' },*/
                headers: {
                    'Content-Type': 'application/json' },
                timeout: 1000
            }).then(response => {
                this.date = response.data.result     // 반환되는 값을 toDoItems에 저장한다.
            })
            .catch(e => {
                console.log('error : ', e)          // 에러가 나는 경우 콘솔에 에러를 출력한다
            });
        }
    }
}
</script>

