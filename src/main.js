import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import StatusComponent from './status'

Vue.component('AppStatus',StatusComponent)/* 전역변수로 선언 */

Vue.config.productionTip = false

new Vue({ /*vue를 선언, 이 선언된 곳을 통해서 전체 애플리케이션이 실행됨*/
  vuetify,
  render: h => h(App)
}).$mount('#app')
