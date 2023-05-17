<template>
  <div class="container input-bg col-md-4">
    <h1>회원가입</h1>
    <form ref="formRef" @submit.prevent="submitHandler">
      <div class="form-group flex-box">
        <div class="flex-container">
          <label for="userNumber">이름</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            name="userName"
            placeholder="이름을 입력하세요"
            required
            v-model="formData.userName"
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
            v-model="formData.userNumber"
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
            v-model="formData.password"
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
            v-model="formData.passwordCheck"
          />
        </div>
        <div class="flex-container">
          <label for="userPwQ">비밀번호 찾기 질문</label>
          <select
            class="form-select"
            required
            name="question"
            id="userPwQ"
            v-model="formData.question"
          >
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
            v-model="formData.answer"
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
            v-model="formData.birth"
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
            v-model="formData.phoneNumber"
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
            v-model="formData.major"
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
            v-model="formData.email"
          />
        </div>
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { usePostAxios } from "@/composable";
import { useRouter } from "vue-router";

const formRef = ref(null);
const formData = reactive({
  userName: "",
  userNumber: "",
  password: "",
  passwordCheck: "",
  question: "",
  answer: "",
  birth: "",
  phoneNumber: "",
  major: "",
  email: "",
});
// submit 후 홈으로 리다이렉트
const router = useRouter();
function submitForm() {
  formRef.value.reset();
  router.push({ name: "Login" });
}

// 비밀번호 동일 여부 확인
const password = ref("");
const passwordCheck = ref("");
const sameCheck = () => {
  if (password.value !== passwordCheck.value) return false;
  else return true;
};

// 학번, 핸드폰 번호 숫자 입력인지 확인
function intCheck(num) {
  if (!isNaN(num)) return true;
  else return false;
}

// 중복된 계정인지 post요청 후 응답
async function duplicationCheck() {
  const { getData } = usePostAxios("/api/login/signup", formData);
  const response = await getData();
  if (response.duplication === false) return true;
  else return false;
}
// submit전에 해야하는 동작
const submitHandler = async () => {
  const bothCheck =
    intCheck(formData.phoneNumber) && intCheck(formData.userNumber);
  if (!sameCheck()) {
    alert("비밀번호 동일 여부를 확인해주세요!");
  } else if (!bothCheck) {
    alert("학번과 전화번호에는 숫자만 입력가능합니다!");
  } else {
    const response = await duplicationCheck();
    if (response === true) {
      alert("회원가입 완료!");
      submitForm();
    } else {
      alert("이미 가입된 회원입니다!");
    }
  }
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
