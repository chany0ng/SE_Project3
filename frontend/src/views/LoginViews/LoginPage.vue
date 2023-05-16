<template>
  <router-view></router-view>
  <div class="container">
    <div class="col-flex">
      <div id="title" class="font">학사관리 시스템</div>
      <div class="col-md-6">
        <form action="/" method="post">
          <div class="form-group">
            <label for="userNumber"></label>
            <input
              type="text"
              class="form-control"
              id="userNumber"
              name="userNumber"
              placeholder="학번을 입력하세요"
              required
              v-model="userNumber"
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
              v-model="password"
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
            <input type="hidden" name="userType" :value="userType" />
          </div>
          <button type="submit" class="btn lgn-btn font">Login</button>
        </form>
        <router-link to="/login/signup" style="color: var(--brown1)"
          >New to us? Join now!</router-link
        >
      </div>
      <div>{{ loginStatus }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGetAxios } from "@/composable";

let userNumber = ref("");
let password = ref("");
let userType = ref("");
let loginStatus = ref([]);
let setUserType = (type) => {
  userType.value = type;
};

// let id = this.$route.params.id;

// 로그인 유무 받아오기
onMounted(async function loginCheck() {
  const { getData } = useGetAxios("/login");
  const response = await getData();
  console.log(`response: ${response.login}`);
  if (response.login === true) {
    loginStatus.value = "yes";
  } else {
    loginStatus.value = "no";
  }
  console.log(`loginStatus: ${loginStatus.value}`);
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
  width: 35%;
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
