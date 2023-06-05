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
          <td style="background-color: lightblue">과목1</td>
          <td>과목2</td>
          <td>과목3</td>
          <td>과목4</td>
          <td>과목5</td>
          <td>과목6</td>
        </tr>
        <tr>
          <td>2교시</td>
          <td>과목7</td>
          <td>과목8</td>
          <td>과목9</td>
          <td v-for="(course, index) of subjectData" :key="index">
            {{ course.subject.subject_name }}
          </td>
        </tr>
        <tr>
          <td>3교시</td>
          <td>과목13</td>
          <td>과목14</td>
          <td>과목15</td>
          <td>과목16</td>
          <td>과목17</td>
          <td>과목18</td>
        </tr>
        <tr>
          <td>4교시</td>
          <td>과목19</td>
          <td>과목20</td>
          <td>과목21</td>
          <td>과목22</td>
          <td>과목23</td>
          <td>과목24</td>
        </tr>
        <tr>
          <td>5교시</td>
          <td>과목25</td>
          <td>과목26</td>
          <td>과목27</td>
          <td>과목28</td>
          <td>과목29</td>
          <td>과목30</td>
        </tr>
        <tr>
          <td>6교시</td>
          <td>과목31</td>
          <td>과목32</td>
          <td>과목33</td>
          <td>과목34</td>
          <td>과목35</td>
          <td>과목36</td>
        </tr>
        <tr>
          <td>7교시</td>
          <td>과목31</td>
          <td>과목32</td>
          <td>과목33</td>
          <td>과목34</td>
          <td>과목35</td>
          <td>과목36</td>
        </tr>
        <tr>
          <td>8교시</td>
          <td>과목31</td>
          <td>과목32</td>
          <td>과목33</td>
          <td>과목34</td>
          <td>과목35</td>
          <td>과목36</td>
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
</script>

<style scoped>
#list-table {
  background-color: white;
  width: 55vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main3-color);
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
  border: 2px solid var(--main3-color);
  border-radius: 10px;
  table-layout: fixed;
}
#time-table tr td:first-child {
  font-size: small;
  padding: 1px;
  border: 1px solid var(--main2-color);
  width: 30px;
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
