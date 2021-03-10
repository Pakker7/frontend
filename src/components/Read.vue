<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <template>
                    <div class="text-lg-right">
                        <v-btn
                            dark class="mb-2"
                            @click="formClearAndshowModal()"
                        >New Item</v-btn>

                      <v-btn color="green darken-1" flat @click="logout()">
                        <v-label>{{ this.userName }}</v-label>LOG OUT</v-btn>
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
                                <v-btn color="green darken-1" flat @click="isCrate ? create() : update()">Yes</v-btn>
                                <v-btn color="red darken-1" flat @click.native="dialog = false">No</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="deleteDialog" persistent max-width="400px">
                        <v-card>
                            <v-card-title class="headline">Delete</v-card-title>
                            <v-card-text>
                                삭제 하시겠습니까?
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" flat @click="deleteData()">Yes</v-btn>
                                <v-btn color="green darken-1" flat @click.native="deleteDialog = false">No</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <v-snackbar v-model="alertSnackbar.active">
                        {{ alertSnackbar.msg }}
                        <v-btn flat @click="alertSnackbar.active = false">닫기</v-btn>
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
                                <v-icon @click="get(props.item.no)">fas fa-edit</v-icon>
                            </div>
                            <div class="icon-space">
                                <v-icon @click="showDeleteModal(props.item.no)">fas fa-trash-alt</v-icon>
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

//TODO script 부분이랑 분리?? vue에서 그렇게 하는지 모르겠지만 어쨌든
//TODO :: 이거 있는거랑 없는거 차이
//TODO 함수용으로 변수에다 넣어서 사용하려면.... this.isCrate .. 이거.....

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
            dialog: false,
            form: {
                no : 0,
                title: '',
                contents: '',
                writer:''
            },
            deleteDialog : false,
            deleteNo: 0,
            isCrate : true,
            alertSnackbar: {
                active: false,
                msg: ''
            },
            userName : null
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            const baseURI = '/api/selectList';
            $axios.get(baseURI, {
                /*params: { title: '타이틀' },
                headers: {
                    'Content-Type': 'application/json' },*/
                timeout: 1000
            }).then(response => {
                this.date = response.data.result
            }).catch(e => {
                console.error('error : ', e)
            });
        },

        formClearAndshowModal () {
            this.form.title = ""
            this.form.contents = ""
            this.form.writer = ""

            this.dialog = true
            this.isCrate = true // create 인지 여부
        },

        hideModal () {
            this.dialog = false
        },

        get (no) {
            let that = this;
            const baseURI = '/api/board/' + no;
            $axios.get(baseURI)
                .then(response => {
                if (response) {
                    that.formClearAndshowModal();
                    that.isCrate = false;

                    that.form.no = no;
                    that.form.title = response.data.result.title
                    that.form.contents = response.data.result.contents
                    that.form.writer = response.data.result.writer
                } else {
                    that.popupAlert("데이터 불러오기를 실패하였습니다. 관리자에게 문의 하세요.");
                }

            }).catch(e => {
                console.error('error : ', e)
            });
        },
        create () {
            //유효성 검사
            if (!this.validation()) {
                return;
            }

            const baseURI = '/api/save';
            $axios.post(baseURI, this.form,{
                headers: {
                    'Content-Type': 'application/json' }
                }
            ).then(response => {
                if (response.data.result > 0) {
                    this.hideModal();
                    this.getList();

                    this.popupAlert("저장되었습니다");
                } else {
                    this.popupAlert("실패하였습니다. 관리자에게 문의 하세요.");
                }
            }).catch(e => {
                console.error('error : ', e)
            });
        },

        update () {
            //유효성 검사
            if (!this.validation()) {
                return;
            }

            const baseURI = '/api/board/' + this.form.no;
            $axios.put(baseURI, this.form,{
                    headers: {
                        'Content-Type': 'application/json' }
                }
            ).then(response => {
                if (response.data.result > 0) {
                    this.hideModal();
                    this.getList();

                    this.popupAlert("수정 되었습니다");
                } else {
                    this.popupAlert("실패하였습니다. 관리자에게 문의 하세요.");
                }
            }).catch(e => {
                console.error('error : ', e)
            });
        },

        showDeleteModal (no) {
            this.deleteDialog = true;
            this.form.no = no;
        },

        hideDeleteModal () {
            this.deleteDialog = false;
        },

        deleteData (){
          let that = this;
          const baseURI = '/api/board/' + this.form.no;
          $axios.delete(baseURI, {
            headers: {
              'Content-Type': 'application/json' }
          }).then(function (response) {
            console.log(response.data.result);
                if (response.data.result) {
                  that.hideDeleteModal()
                  that.getList();

                  that.popupAlert("삭제 되었습니다");
                }
              })
              .catch(function (error) {
                console.error('error : ', error)
              })
              .then(function () {
                // always executed
              });
        },

        popupAlert (msg) {
            this.alertSnackbar.active = true
            this.alertSnackbar.msg = msg
        },

        validation () {
            if (!this.form.title){
                this.popupAlert('제목을 작성해주세요');
                return;
            }
            if (!this.form.contents) {
                this.popupAlert('내용을 작성해주세요');
                return;
            }
            if (!this.form.writer) {
                return this.popupAlert('작성자를 작성해주세요');
                return;
            }

            return true;
        },
        logout () {
          location.href="/logout";
          // spring security에서 기본적으로 제공하는 로그아웃 url(안만들어도 자동으로 logout 됨, SecurityConfig에서 변경 가능)
        },
    }
}
</script>

