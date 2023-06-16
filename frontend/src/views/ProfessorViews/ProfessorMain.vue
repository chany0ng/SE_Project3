<template>
  <router-view></router-view>
  <main v-if="isRendered">
    <ProfessorHeader />
    <!-- <Background>
       <template v-slot:title>
        
      </template> 
       <template v-slot:content>
        <div class="container">
          <div class="inner-container1">
            <div class="item">
              <h2>
                <span style="font-size: 15px; font-weight: bold">이기훈</span>
                교수님 반갑습니다.
              </h2>
              <table class="tg">
                <thead>
                  <tr>
                    <th class="tg-baqh">학과/학부</th>
                    <th class="tg-baqh">이메일</th>
                    <th class="tg-baqh">전화번호</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td class="tg-baqh">컴퓨터정보공학부</td>
                    <td class="tg-baqh">khlee@kw.ac.kr</td>
                    <td class="tg-baqh">010-12234-5678</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="inner-container2">
            <h1>담당 과목</h1>
            <div class="subject-block">
              <div class="item">
                <h2>소프트웨어공학</h2>
              </div>
              <div class="item">
                <button class="my-button">공지사항 →</button>
              </div>
              <div class="item">
                <button class="my-button">강의계획서 →</button>
              </div>
              <div class="item">
                <button class="my-button">강의 묻고 답하기 →</button>
              </div>
            </div>
            <div class="subject-block">
              <div class="item">
                <h2>데이터베이스</h2>
              </div>
              <div class="item">
                <button class="my-button">공지사항 →</button>
              </div>
              <div class="item">
                <button class="my-button">강의계획서 →</button>
              </div>
              <div class="item">
                <button class="my-button">강의 묻고 답하기 →</button>
              </div>
            </div>
          </div>
        </div>
      </template> 
    </Background>  -->
    <div class="container">
      <div class="inner-container1">
        <div class="item">
          <h1>
            <span style="font-size: 15px; font-weight: bold">이기훈</span>
            교수님 반갑습니다.
          </h1>
          <table class="tg">
            <thead>
              <tr>
                <th class="tg-baqh">학과/학부</th>
                <th class="tg-baqh">이메일</th>
                <th class="tg-baqh">전화번호</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="tg-baqh">컴퓨터정보공학부</td>
                <td class="tg-baqh">khlee@kw.ac.kr</td>
                <td class="tg-baqh">010-12234-5678</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="inner-container2">
        <h1>담당 과목</h1>
        <div class="subject-block">
          <div class="item" style="width: 90px; height: 50px">
            <h2>소프트웨어공학</h2>
          </div>
          <div class="item">
            <button class="my-button">공지사항 →</button>
          </div>
          <div class="item">
            <button class="my-button">강의계획서 →</button>
          </div>
          <div class="item">
            <button class="my-button">강의 묻고 답하기 →</button>
          </div>
        </div>
        <div class="subject-block">
          <div class="item" style="width: 90px; height: 50px">
            <h2>데이터베이스</h2>
          </div>
          <div class="item">
            <button class="my-button">공지사항 →</button>
          </div>
          <div class="item">
            <button class="my-button">강의계획서 →</button>
          </div>
          <div class="item">
            <button class="my-button">강의 묻고 답하기 →</button>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
  </main>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch, reactive } from "vue";
import { loginCheck, useGetAxios } from "@/composable";
import MainFooter from "../../layouts/MainFooter.vue";
import ProfessorHeader from "../../layouts/ProfessorHeader.vue";
import Background from "@/components/Background.vue";
import router from "@/router";
import store from "@/store";

//로그인 유무 받아오기
onBeforeMount(async () => {
  const { getData } = useGetAxios("/api/professor");
  const response = await getData();
  if (response.status === 200) {
    console.log(response.data);
  } else {
    alert("로그인을 해주세요!");
  }
});

const isRendered = ref(true);
const subjectData = ref();
</script>

<style scoped>
h1 {
  font-size: 15px;
  margin-bottom: 20px;
  margin-left: 20px;
  text-align: left;
}

h2 {
  font-size: 12px;
  margin-bottom: 20px;
  text-align: left;
}

.container {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
}

.inner-container1 {
  width: 580px;
  padding: 10px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: left;
}

.inner-container2 {
  width: 580px;
  padding: 10px;
  border: 1px solid #cccccc;
  text-align: center;
  margin-top: 15px;
}

.item {
  margin: 0 10px;
  display: inline-block;
}

.subject-block {
  width: 550px;
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  margin: 5px;
}

.tg {
  border-collapse: collapse;
  border-spacing: 0;
  width: 550px;
}

.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 11px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
  height: 10px;
}

.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
  height: 20px;
}

.tg .tg-baqh {
  text-align: center;
  vertical-align: middle;
}

.my-button {
  font-size: 12px;
  padding: 3px 3px;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  border: none;
}
</style>
