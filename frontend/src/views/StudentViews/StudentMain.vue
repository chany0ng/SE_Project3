<template>
  <router-view></router-view>
  <main v-if="isRendered">
    <StudentHeader />
    <!-- <Asidebar /> -->
    <div id="list-table">
      <table class="table table-sm table-hover" style="font-size: small">
        <thead style="font-size: 1.1rem">
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
    <select id="select" v-model="yearSemester" style="margin-top: 10px">
      <option value="2023/2">2023학년도 2학기</option>
      <option value="2023/1" selected>2023학년도 1학기</option>
      <option value="2022/2">2022학년도 2학기</option>
      <option value="2022/1">2022학년도 1학기</option>
      <option value="2021/2">2021학년도 2학기</option>
      <option value="2021/1">2021학년도 1학기</option>
      <option value="2020/1">2020학년도 2학기</option>
      <option value="2020/1">2020학년도 1학기</option>
    </select>

    <div>
      <table id="time-table">
        <tr id="row-header">
          <th></th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
        <tr>
          <td>1교시</td>
          <td ref="월1"></td>
          <td ref="화1"></td>
          <td ref="수1"></td>
          <td ref="목1"></td>
          <td ref="금1"></td>
          <td ref="토1"></td>
        </tr>
        <tr>
          <td>2교시</td>
          <td v-for="(course, index) of subjectData" :key="index">
            {{ course.subject.subject_name }}
          </td>
        </tr>
        <tr>
          <td>3교시</td>
          <td ref="월3"></td>
          <td ref="화3"></td>
          <td ref="수3"></td>
          <td ref="목3"></td>
          <td ref="금3"></td>
          <td ref="토3"></td>
        </tr>
        <tr>
          <td>4교시</td>
          <td ref="월4"></td>
          <td ref="화4"></td>
          <td ref="수4"></td>
          <td ref="목4"></td>
          <td ref="금4"></td>
          <td ref="토4"></td>
        </tr>
        <tr>
          <td>5교시</td>
          <td ref="월5"></td>
          <td ref="화5"></td>
          <td ref="수5"></td>
          <td ref="목5"></td>
          <td ref="금5"></td>
          <td ref="토5"></td>
        </tr>
        <tr>
          <td>6교시</td>
          <td ref="월6"></td>
          <td ref="화6"></td>
          <td ref="수6"></td>
          <td ref="목6"></td>
          <td ref="금6"></td>
          <td ref="토6"></td>
        </tr>
        <tr>
          <td>7교시</td>
          <td ref="월7"></td>
          <td ref="화7"></td>
          <td ref="수7"></td>
          <td ref="목7"></td>
          <td ref="금7"></td>
          <td ref="토7"></td>
        </tr>
        <tr>
          <td>8교시</td>
          <td ref="월8"></td>
          <td ref="화8"></td>
          <td ref="수8"></td>
          <td ref="목8"></td>
          <td ref="금8"></td>
          <td ref="토8"></td>
        </tr>
      </table>
    </div>
  </main>
  <MainFooter />
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { loginCheck } from "@/composable";
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
const yearSemester = ref("2023/1"); // 초기 값 설정
</script>

<style scoped>
#list-table {
  background-color: white;
  width: 55vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main2-color);
  border-radius: 10px;
}

#time-table {
  text-align: center;
  border-collapse: collapse;
  width: 65vw;
  background-color: white;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main2-color);
  border-radius: 10px;
  table-layout: fixed;
}
#time-table tr td:first-child {
  font-size: small;
  padding: 1px;
  border: 1px solid var(--main2-color);
  width: 10px;
  height: 50px;
}
#time-table tr td:nth-child(n + 2) {
  border: 1px solid var(--main2-color);
  padding: 8px;
  height: 50px;
  width: 70px;
  font-size: small;
}
#time-table th {
  border-left: 1px solid var(--main2-color);
}
#row-header {
  background-color: floralwhite;
  padding: 3px;
}
</style>
