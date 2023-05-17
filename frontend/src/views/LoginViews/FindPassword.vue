<template>
  <div class="container input-bg col-md-4">
    <h1>비밀번호 찾기</h1>
    <form action="/api/login/findpw" method="post" @submit.prevent="submitForm">
      <div class="form-group flex-box">
        <div class="flex-container" v-show="showQuestion">
          <label for="userName">이름</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            name="userName"
            placeholder="이름을 입력하세요"
            :required="showQuestion"
          />
        </div>
        <div class="flex-container" v-show="showQuestion">
          <label for="userNumber">학번</label>
          <input
            type="text"
            class="form-control"
            id="userNumber"
            name="userNumber"
            placeholder="학번을 입력하세요"
            :required="showQuestion"
            v-model="userNumber"
          />
        </div>
        <div class="flex-container" v-show="!showQuestion">
          <label for="userPwQ">비밀번호 찾기 질문</label>
          <select class="form-select" name="question" id="userPwQ">
            <option value="elementary" v-show="!showMiddle">
              졸업한 초등학교 이름
            </option>
            <option value="middle" v-show="showMiddle">
              졸업한 중학교 이름
            </option>
          </select>
        </div>
        <div class="flex-container" v-show="!showQuestion">
          <label for="userPwA">비밀번호 찾기 답변</label>
          <input
            type="text"
            class="form-control"
            id="userPwA"
            name="answer"
            placeholder="비밀번호 찾기 질문 답변"
            :required="!showQuestion"
          />
        </div>
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
    {{ userNumber }}
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref } from "vue";
import { usePostAxios } from "@/composable";
import { useRouter } from "vue-router";
const router = useRouter();
const showQuestion = ref(true);
const showMiddle = ref(true);
const userNumber = ref("");

// submit 제출
function submitForm() {
  // 이름,학번 제출
  if (!showQuestion.value) {
    const response = usePostAxios("/api/login/findpw");
    if (response.exist === true) {
      if (response.question !== "middle") {
        showMiddle.value = !showMiddle.value;
      }
      showQuestion.value = !showQuestion.value;
    } else alert("존재하지 않는 계정입니다!");
  }
  // 비밀번호 찾기 답변 제출
  else {
    const response = usePostAxios("/api/login/findpw", { id: userNumber });
    alert(`비밀번호는 ${response.number}입니다.`);
    router.push({ name: "Login" });
  }
}
</script>

<style scoped>
div {
  background-color: white;
}
input,
select {
  border-color: #fa9884;
  width: 60%;
}
h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  color: var(--main-color);
  font-weight: bold;
}
.flex-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  white-space: nowrap;
  width: 90%;
  padding: 5px;
}
label {
  color: black;
  margin-bottom: 10px;
  font-size: large;
}

.btn {
  background-color: rgba(250, 152, 133, 0.3);
  width: 30%;
  color: var(--main-color);
  font-weight: bold;
}

.btn:hover {
  background-color: var(--main2-color);
  color: rgba(231, 70, 70, 0.9);
}
</style>
