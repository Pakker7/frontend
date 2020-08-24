<template>
  <div>
    This is About Pageddddddddddddddddd
    <h1>클릭1</h1>

    <br>
    <a href="/">테스트?</a><!-- 이런 html코드도 되는데-->
    <h2>
      <router-link :to="{name:'home'}"> <!-- 이렇게도 가능 -->
        클릭2
      </router-link> <!-- 헐 이게 f12로 보면 a태그로 바뀜-->
    </h2>
  </div>
</template>
