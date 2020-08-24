<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    > <!--왼쪽 三-->
      <v-list dense>
        <!-- <v-list-tile @click="$router.push('/home')"> //간단하게 쓸수 있음-->
        <!-- <v-list-tile router :to="{name:'home'}"> // 간단하게 쓸수 있음-->
        <v-list-tile router :to="{name:'home'}" exact> <!-- 해당하는 글자를 활성화(색변경) 시켜주는데 ex. /과 /about 있으면 /about누를 때도 활성화 시켜줌 exact를 넣으면 확실한 주소에만 활성화를 시켜줌 -->
          <v-list-tile-action>
            <i class="fas fa-home"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push({name:'about'})" exact><!--= a href랑 같음, ※router.js의 path가 아닌 name값임-->
          <v-list-tile-action>  <!--@click="$router.push({path:'/about'})" 이렇게도 가능, 결론적으로 객체로 전달하는 것임!!-->
            <i class="fas fa-user"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar> <!--header-->
    <v-content>


      <router-view></router-view> <!--그 내용이 뭐던지 간에 router.js에서 바인딩한 내용을 가져온다-->


    </v-content> <!--body-->
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
}
</script>