<template>
  <div class="container input-bg col-md-4">
    <h1>회원가입</h1>
    <form
      action="/login/signup"
      method="post"
      @submit.prevent="[sameCheck, submitForm]"
    >
      <div class="form-group flex-box">
        <div class="flex-container">
          <label for="userName">이름</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            name="userName"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userNumber">학번</label>
          <input
            type="text"
            class="form-control"
            id="userNumber"
            name="userNumber"
            placeholder="학번을 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="password">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            required
            v-model="password"
          />
        </div>
        <div class="flex-container">
          <label for="userPwCheck">비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            id="userPwCheck"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            required
            v-model="passwordCheck"
          />
        </div>
        <div class="flex-container">
          <label for="userPwQ">비밀번호 찾기 질문</label>
          <select class="form-select" required name="question" id="userPwQ">
            <option value="">선택해주세요</option>
            <option value="elementary">졸업한 초등학교 이름</option>
            <option value="middle">졸업한 중학교 이름</option>
          </select>
        </div>
        <div class="flex-container">
          <label for="userPwA">비밀번호 찾기 답변</label>
          <input
            type="text"
            class="form-control"
            id="userPwA"
            name="answer"
            placeholder="비밀번호 찾기 질문 답변"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userBirth">생년월일</label>
          <input
            type="date"
            class="form-control"
            id="userBirth"
            name="birth"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userPhone">전화번호</label>
          <input
            type="text"
            class="form-control"
            id="userPhone"
            name="phoneNumber"
            placeholder="숫자로만 입력해주세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userMajor">학과</label>
          <input
            type="text"
            class="form-control"
            id="userMajor"
            name="major"
            placeholder="학과(학부)를 입력하세요"
            required
          />
        </div>
        <div class="flex-container">
          <label for="userEmail">이메일</label>
          <input
            type="email"
            class="form-control"
            id="userEmail"
            name="email"
            placeholder="Email을 입력하세요"
            required
          />
        </div>
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref } from "vue";

// submit 후 홈으로 리다이렉트
const submitForm = () => {
  this.$router.push({ path: "/login" });
};

// 비밀번호 동일 여부 확인
const password = ref("");
const passwordCheck = ref("");
const sameCheck = () => {
  if (password.value !== passwordCheck.value) {
    alert("비밀번호를 다시 확인해주세요!");
    return false;
  }
  return true;
};
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  white-space: nowrap;
  width: 90%;
  padding: 5px;
}
label {
  margin-left: 10px;
  margin-left: 40px;
  color: black;
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
