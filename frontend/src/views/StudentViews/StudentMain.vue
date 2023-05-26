<template>
  <router-view></router-view>
  <main>
    <StudentHeader />
    <!-- <Asidebar /> -->
    <div id="time-table">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">수강 과목 현황</th>
            <th scope="col">과제</th>
            <th scope="col">공지사항</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">산학협력캡스톤설계</th>
            <td>새로운 과제가 없습니다!</td>
            <td>새로운 공지사항이 있습니다!</td>
          </tr>
          <tr>
            <th scope="row">소프트웨어공학</th>
            <td>없습니다!</td>
            <td>있습니다!</td>
          </tr>
          <tr>
            <th scope="row">소프트웨어프로젝트1</th>
            <td>없습니다!</td>
            <td>있습니다!</td>
          </tr>
          <tr>
            <th scope="row">생활속의과학</th>
            <td>없습니다!</td>
            <td>있습니다!</td>
          </tr>
        </tbody>
      </table>
    </div>
    <MainFooter />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { loginCheck } from "@/composable";
import MainFooter from "../../layouts/MainFooter.vue";
import StudentHeader from "../../layouts/StudentHeader.vue";
import router from "@/router";
// import Asidebar from "../../layouts/AsideBar.vue";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("api/student");
  console.log(`학생메인화면 로그인여부: ${loggedIn}`);

  if (loggedIn === true) {
    router.push("/student");
  } else {
    router.push("/login");
  }
});
// <----------provide & inject 사용---------->
// import { provide, ref } from "vue";
// const message = ref("Hello from parent!");
// provide("message", message);
// <----------provide & inject 사용---------->

// import {useStore} from "vuex";
// const store = useStore();
// function incrementCount() {
//   store.commit("myModule/increment");
// }
// function incrementCountAsync() {
//   store.dispatch("myModule/incrementAsync");
// }
</script>

<style scoped>
#time-table {
  background-color: white;
  width: 50vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--main3-color);
  border-radius: 5px;
}
table {
  height: 100px;
  font-size: small;
}
</style>
