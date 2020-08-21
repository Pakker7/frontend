import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import StatusComponent from './status'

Vue.component('AppStatus',StatusComponent)/* 전역변수로 선언 */

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods:{   //methods 꼭 s를 붙여야 함... 에러 표시가 안남.....;;
    userWasEdited(date){
      this.$emit("userWasEdited", date);
    }
  }
});
/*새로운 Vue인스턴스를 생성해서 export(내보내기) 하고 있다*/

new Vue({ /*vue를 선언, 이 선언된 곳을 통해서 전체 애플리케이션이 실행됨*/
  vuetify,
  render: h => h(App)
}).$mount('#app')
