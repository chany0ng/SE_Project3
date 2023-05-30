<template>
  <StudentHeader />
  <div>학생 마이페이지</div>
  <MainFooter />
</template>

<script setup>
import { onMounted, watch } from "vue";
import { loginCheck, saveUser, loadUser, setRef } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import router from "@/router";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  }
});
const userData = setRef();
console.log(userData);
console.log(userData[0]);
</script>

<style></style>
