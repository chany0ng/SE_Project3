<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link to="/student" class="navbar-brand" id="title"
        >KW학사관리</router-link
      >
      <ul>
        <li>
          <button><router-link to="/student">메인 화면</router-link></button>
        </li>
        <li>
          <button>수강 관리</button>
          <ul>
            <li><router-link to="">공지사항 조회</router-link></li>
            <li><router-link to="">강의계획서 조회</router-link></li>
            <li><router-link to="">강의 묻고 답하기</router-link></li>
          </ul>
        </li>
        <li>
          <button>학습 지원실</button>
          <ul>
            <li><router-link to="">과제 제출</router-link></li>
            <li><router-link to="">성적 조회</router-link></li>
            <li><router-link to="">석차 조회</router-link></li>
          </ul>
        </li>
        <li>
          <button><router-link to="">수강 신청</router-link></button>
        </li>
        <li>
          <button>
            <router-link to="/student/mypage/information"
              >마이페이지</router-link
            >
          </button>
        </li>
      </ul>
      <button
        type="button"
        @click="confirmLogout"
        id="logout"
        style="
          color: white;
          font-size: small;
          font-weight: 300;
          margin-right: 10px;
          margin-bottom: 20px;
        "
      >
        Logout ->
      </button>
    </div>
  </nav>
</template>

<script setup>
import { defineExpose } from "vue";
import { usePostAxios } from "@/composable";
import { useRouter } from "vue-router";
import store from "@/store";
const router = useRouter();

// 로그아웃 버튼 클릭 시 실행 함수
async function confirmLogout() {
  if (confirm("로그아웃 하시겠습니까?")) {
    const { postData } = usePostAxios("/api/login/logout");
    const response = await postData();
    if (response.status === 200) {
      logout(); // vuex 초기화
      router.push("/login");
    } else {
      alert("로그아웃 에러!!");
    }
  }
}
const logout = () => {
  // Clear user information from the Vuex store
  store.dispatch("userInfo/setUser", null);
  localStorage.removeItem("vuex");
};
defineExpose({ router });
</script>

<style scoped>
nav button {
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(250, 152, 132, 0.6);
  color: var(--main-color);
  border-radius: 5px;
  padding: 3px 25px;
  font-size: 1rem;
}

ul {
  display: flex;
  justify-content: space-between;
}
#title {
  font-size: xx-large;
  font-weight: bold;
  color: var(--main-color);
  border: 2px solid var(--main-color);
  padding: 2px 5px;
  margin-top: 10px;
  margin-left: 10px;
}
nav li {
  margin-right: 3rem;
  position: relative;
}

nav a {
  display: block;
  text-decoration: none;
  color: var(--main-color);
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
nav ul ul {
  display: none;
  position: absolute;
  top: 100%;
  left: -10%;
  background-color: rgb(255, 185, 171);
  padding: 10px;
  box-shadow: blur spread;
  width: 120%;
  font-size: 1rem;
}
nav ul ul li {
  margin: 10px 0px;
  padding: 0px;
}
nav ul li:hover > ul {
  display: block;
  border-radius: 5px;
}
nav ul ul li a:hover {
  font-weight: bold;
}
#logout {
  padding: 1px;
  width: 80px;
  height: 30px;
  color: yello;
  font-weight: bold;
}
</style>
