<template>
  <v-container grid-list-md>
    <v-layout align-center justify-center>
      <v-flex xs4 text-xs-center>
        <v-card>
          <v-card-text subheading >
            <template v-if='options.isLogin'>로그인 하세요.</template>
<!--            <template v-else='options.isLogin'>회원가입 하세요.</template>-->
            <v-form>

              <v-text-field light prepend-icon='email' label='아이디'
                            required
                            v-model="form.id"></v-text-field>
              <v-text-field light prepend-icon='lock' label='비밀번호' type='password'
                            required
                            v-model="form.pw"></v-text-field>
              <v-btn color="green darken-1" flat @click="login()">LOG IN</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-snackbar v-model="alertSnackbar.active">
          {{ alertSnackbar.msg }}
          <v-btn flat @click="alertSnackbar.active = false">닫기</v-btn>
        </v-snackbar>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import $axios from 'axios'

export default{
  data () {
    return {
      form: {
        id: '',
        pw: ''
      },
      options: {
        isLoggingIn: false, //로그인 한 상태인지
        isLogin : true // 로그인 or 회원가입
      },
      alertSnackbar: {
        active: false,
        msg: ''
      },
    }
  },
  mounted() {
    this.loginCheck();
  },
  methods:{
    loginCheck() {
      if(this.isLoggingIn) {
        location.href="/";
      }
    },

    login() {
      //유효성 검사
      if (!this.validation()) {
        return;
      }

      // TODO 바로 연결 할 수 있게 수정 하기
      location.href="http://localhost:9000/login/oauth2/code/google";


      // const baseURI = '/api/login';
      // $axios.post(baseURI, this.form,{
      //       headers: {
      //         'Content-Type': 'application/json' }
      //     }
      // ).then(response => {
      //   if (response.data.result > 0) {
      //     this.popupAlert("로그인에 성공했습니다.");
      //   } else {
      //     this.popupAlert("없는 아이디거나 비밀번호가 틀렸습니다.");
      //   }
      // }).catch(e => {
      //   console.error('error : ', e)
      // });
    },

    validation () {
      if (!this.form.id){
        this.popupAlert('아이디를 작성해주세요');
        return;
      }
      if (!this.form.pw){
        this.popupAlert('패스워드를 작성해주세요');
        return;
      }
      return true;
    },

    popupAlert (msg) {
      this.alertSnackbar.active = true
      this.alertSnackbar.msg = msg
    },
  }
}

</script>