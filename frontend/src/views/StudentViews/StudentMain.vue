<template>
  <router-view></router-view>
  <main v-if="isRendered">
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
          <tr v-for="(course, index) of subjectData" :key="index">
            <th scope="row">{{ course.subject.subject_name }}</th>
            <td>새로운 과제가 없습니다!</td>
            <td>새로운 공지사항이 있습니다!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
  <MainFooter />
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { loginCheck, useGetAxios, usePostAxios } from "@/composable";
import MainFooter from "../../layouts/MainFooter.vue";
import StudentHeader from "../../layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";
// import Asidebar from "../../layouts/AsideBar.vue";

//로그인 유무 받아오기
onBeforeMount(async () => {
  const loggedIn = await loginCheck("/api/student");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    isRendered.value = true;
  }
});
const isRendered = ref(false);
const userData = computed(() => store.getters["userInfo/getUser"]);
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);

// <----------provide & inject 사용---------->
// import { provide, ref } from "vue";
// const message = ref("Hello from parent!");
// provide("message", message);
// <----------provide & inject 사용---------->
</script>

<style scoped>
#time-table {
  background-color: white;
  width: 55vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main3-color);
  border-radius: 10px;
}
table {
  height: 100px;
  font-size: small;
}
thead {
  font-size: 1.1rem;
}
</style>
