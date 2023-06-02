<template>
  <router-view></router-view>
  <div class="container">
    <div class="col-flex">
      <div id="title" class="font">학사관리 시스템</div>
      <div class="col-md-6">
        <form action="/api/login" method="post" ref="formRef">
          <div class="form-group">
            <label for="userNumber"></label>
            <input
              type="text"
              class="form-control"
              id="userNumber"
              name="userNumber"
              placeholder="학번을 입력하세요"
              required
              v-model="loginData.userNumber"
            />
          </div>
          <div class="form-group">
            <label for="password"></label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              required
              v-model="loginData.password"
            />
          </div>
          <router-link to="/login/findpw" id="forgot"
            >Forgot your password?</router-link
          >
          <div class="row-flex">
            <button
              type="button"
              @click="setUserType('student')"
              class="btn for-btn font"
            >
              For student
            </button>
            <button
              type="button"
              @click="setUserType('professor')"
              class="btn for-btn font"
            >
              For professor
            </button>
            <button
              type="button"
              @click="setUserType('admin')"
              class="btn for-btn font"
            >
              For admin
            </button>
            <input type="hidden" name="userType" :value="loginData.userType" />
          </div>
          <button
            type="submit"
            class="btn lgn-btn font"
            @click.prevent="loginSubmit"
          >
            Login
          </button>
        </form>
        <router-link to="/login/signup" style="color: var(--brown1)"
          >New to us? Join now!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { usePostAxios, loginCheck } from "@/composable";
import { useRouter } from "vue-router";
import store from "@/store";

// 로그인 시 필요한 입력 값
const loginData = reactive({
  userNumber: "",
  password: "",
  userType: "",
});
const formRef = ref(null);

// 유저 타입 Setter
let setUserType = (type) => {
  if (loginData.userType === "") {
    loginData.userType = type;
  } else {
    loginData.userType = "";
  }
};

// 입력 값 초기화 후 메인페이지 이동
const router = useRouter();
function redirection() {
  formRef.value.reset();
  router.push("/student");
}
// let id = this.$route.params.id;

// 로그인 양식 제출
async function loginSubmit() {
  if (loginData.userType == "") {
    alert("로그인 유형을 선택하세요!!");
  } else {
    const { postData } = usePostAxios("/api/login", loginData);
    const response = await postData();
    if (response.status == 200) {
      // 로그인 성공 시
      // 로그인한 유저 정보 받기
      const userData = response.data[0];
      store.dispatch("userInfo/setUser", userData);
      // 수강중인 과목 정보 받기
      const subjectData = response.data[1];
      store.dispatch("subjectInfo/setSubject", subjectData); // 과목정보
      console.log(store.state.subjectInfo.subject);
      redirection();
    } else {
      formRef.value.reset();
      loginData.userType = "";
      alert("존재하지 않는 계정입니다!");
    }
  }
}
//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/login");
  if (loggedIn === true) {
    alert("로그인 되어있습니다!");
    router.push("/student");
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Noto+Sans+KR:wght@300;400&display=swap");
#title {
  font-weight: 700;
  font-size: 80px;
  color: var(--main-color);
  margin-bottom: 20px;
}
.container {
  position: relative;
  top: 20vh;
}
.col-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.row-flex {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}
input {
  border-color: #fa9884;
  width: 80%;
  margin: 0 auto;
}
#forgot {
  margin-right: 50%;
  margin-bottom: 50px;
  color: var(--brown1);
}

.btn {
  background-color: rgba(250, 152, 133, 0.3);
  width: 25%;
  color: var(--main-color);
  font-weight: bold;
}

.btn:hover {
  background-color: #fa9884;
  transition: background-color 0.5s;
  color: var(--main-color);
}

.btn:focus {
  background-color: #fa9884;
  color: var(--main3-color);
}

.lgn-btn {
  margin-top: 30px;
  border-radius: 30px;
  margin-bottom: 10px;
  width: 50%;
}
</style>
