<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
      <li class="page-item">
        <router-link
          to=""
          class="page-link"
          @click="prevPage"
          :disabled="currentPage === 1"
          >이전으로</router-link
        >
      </li>
      <li class="page-item">
        <router-link to="" class="page-link">1</router-link>
      </li>
      <li class="page-item">
        <router-link to="" class="page-link">2</router-link>
      </li>
      <li class="page-item">
        <router-link to="" class="page-link">3</router-link>
      </li>
      <li class="page-item">
        <router-link
          to=""
          class="page-link"
          @click="nextPage"
          :disabled="currentPage === totalPages"
          >다음으로</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const currentPage = ref(1);
const perPage = 10; // Number of courses per page
const courses = ref([]);
const totalPages = ref(0);

// 페이지 로드될 때, 초기 실행 함수
onMounted(async () => {
  // Fetch the initial courses and calculate total pages
  await getCourses();
  calculateTotalPages(courses.value.length); // Assuming you have the total number of courses available
});

// 페이지에 해당하는 강의목록 받아오기
const getCourses = async () => {
  try {
    const response = await axios.get(`/api/student/`, {
      params: {
        // 현재 페이지와, 강의 개수 넘기기
        page: currentPage.value,
        perPage: perPage,
      },
    });
    courses.value = response.data;
  } catch (error) {
    console.error("Error getting courses:", error);
  }
};

// 전체 페이지 수 계산을 위한 함수
const calculateTotalPages = (totalCourses) => {
  totalPages.value = Math.ceil(totalCourses / perPage);
};

// 이전으로 클릭 시 실행 함수
const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await getCourses();
  }
};
// 다음으로 클릭 시 실행 함수
const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    await getCourses();
  }
};
</script>

<style scoped>
li {
  color: var(--main2-color);
}
</style>
