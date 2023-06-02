<template>
  <div v-if="isRendered">
    <StudentHeader />
    <Background>
      <template v-slot:title>
        <h4>수강신청</h4>
      </template>
      <template v-slot:content>
        <!-- <p v-for="(value, key) of subjectData[0]" :key="key">
          {{ key }} : {{ value }}
        </p>
        <p v-for="(value, key) of subjectData[0].subject" :key="key">
          {{ key }} : {{ value }}
        </p> -->
      </template>
      <template v-slot:pagination>
        <Pagination :path="currentPath" @update-courses="updateCourses" />
      </template>
    </Background>
    <MainFooter />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { loginCheck } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";
import Background from "@/components/Background.vue";
import Pagination from "@/components/Pagination.vue";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student/enrollment");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    isRendered.value = true;
  }
});

const currentPath = "/student/enrollment";
const isRendered = ref(false);
const courses = ref();

// updateCourses 이벤트 핸들러를 정의
const updateCourses = (newCourses) => {
  courses.value = newCourses;
  console.log(newCourses);
  console.log(courses.value);
};

// const userData = computed(() => store.getters["userInfo/getUser"]);
// const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);
</script>
<style scoped></style>
