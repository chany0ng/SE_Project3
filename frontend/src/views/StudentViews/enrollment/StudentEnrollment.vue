<template>
  <StudentHeader />
  <Background>
    <template v-slot:title>
      <h4>수강신청</h4>
    </template>
    <template v-slot:content>
      <p v-for="(value, key) of userData[0]" :key="key">
        {{ key }} : {{ value }}
      </p>
    </template>
    <template v-slot:pagination>
      <p v-for="(value, key) of subjectData[0]" :key="key">
        {{ key }} : {{ value }}
      </p>
      <p v-for="(value, key) of userData[0]" :key="key">
        {{ key }} : {{ value }}
      </p>
    </template>
  </Background>
  <MainFooter />
</template>

<script setup>
import { onMounted, computed } from "vue";
import { loginCheck, useGetAxios, usePostAxios } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";
import Background from "@/components/Background.vue";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  }
});
const userData = computed(() => store.getters["userInfo/getUser"]);
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);
</script>
<style scoped></style>
