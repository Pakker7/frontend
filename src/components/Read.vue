<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <template>
                    <div class="text-lg-right">
                        <v-btn
                            dark class="mb-2"
                            @click="addDialog"
                        >New Item</v-btn>
                    </div>

                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Create</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field
                                                    label="title"
                                                    persistent-hint
                                                    required
                                                    v-model="form.title"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-textarea
                                                    label="contents"
                                                    persistent-hint
                                                    required
                                                    v-model="form.contents"
                                            ></v-textarea>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field
                                                    label="writer"
                                                    persistent-hint
                                                    required
                                                    v-model="form.writer"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat @click="create()">확인</v-btn>
                                <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-snackbar
                            v-model="sb.act"
                    >
                        {{ sb.msg }}
                        <v-btn
                                flat
                                @click="sb.act = false"
                        >닫기
                        </v-btn>
                    </v-snackbar>

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
import $axios from 'axios' //ajax 같은 통신 라이브러리

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
            ],


            board: {
                name: '로딩중...',
                rmk: '무엇?'
            },
            articles: [],
            dialog: false,
            form: {
                title: '',
                contents: '',
                writer:''
            },
            sb: {
                act: false,
                msg: ''
            },
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
            $axios.get(baseURI, {
                /*params: { title: '타이틀' },
                headers: {
                    'Content-Type': 'application/json' },*/
                timeout: 1000
            }).then(response => {
                this.date = response.data.result
            }).catch(e => {
                console.log('error : ', e)
            });
        },
        addDialog () {
            this.dialog = true
            this.form = {
                title: '',
                contents: '',
                writer: ''
            }
        },
        hideDialog () {
            this.dialog = false
        },
        create () {
            //validation
            if (!this.form.title) return this.popupAlert('제목을 작성해주세요')
            if (!this.form.contents) return this.popupAlert('내용을 작성해주세요')
            if (!this.form.writer) return this.popupAlert('작성자를 작성해주세요')

            const baseURI = 'http://127.0.0.1:9000/api/create';
            $axios.post(baseURI, this.form,{
                headers: {
                    'Content-Type': 'application/json' }
                }
            ).then(response => {
                this.hideDialog();
                this.getList();
                if (response.data.result > 0) {
                    this.popupAlert("저장되었습니다");
                } else {
                    this.popupAlert("실패하였습니다. 관리자에게 문의 하세요.");
                }
            }).catch(e => {
                console.log('error : ', e)
            });
        },

        popupAlert (msg) {
            this.sb.act = true
            this.sb.msg = msg
        }
    }
}
</script>

