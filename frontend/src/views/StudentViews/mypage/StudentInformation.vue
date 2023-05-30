<template>
  <StudentHeader />
  <div>학생 마이페이지</div>
  <p>{{ userData[0].pw }}</p>
  <p>{{ userData[0].name }}</p>
  <p>{{ userData[0].student_id }}</p>
  <button @click="change">버튼</button>
  <MainFooter />
</template>

<script setup>
import { onMounted, computed } from "vue";
import { loginCheck } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  }
});
const userData = computed(() => store.getters["userInfo/getUser"]);

function change() {
  userData.value[0].name = "시발새끼";
  store.dispatch("userInfo/setUser", userData);
}
</script>

<style></style>
