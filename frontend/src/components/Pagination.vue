<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
      <li class="page-item">
        <router-link
          to="getLink(currentPage - 1)"
          class="page-link"
          @click="prevPage"
          :disabled="currentPage === 1"
          >이전으로</router-link
        >
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page">
        <router-link :to="getLink(page)" class="page-link">
          {{ page }}
        </router-link>
      </li>
      <li class="page-item">
        <router-link
          to="getLink(currentPage + 1)"
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
import { ref, onMounted, defineProps, defineEmits, toRef } from "vue";
import { useGetAxios } from "@/composable";
const currentPage = ref(1);
const perPage = 10; // Number of courses per page
const courses = ref([]);
const totalPages = ref(0);

// 부모로 부터 받은 경로 설정
const props = defineProps({
  path: String,
});
// 넘어온 원본 경로
const currentPath = toRef(props, "path");
// axios요청 할 서버 경로
const serverPath = "/api" + currentPath.value;
// 부모에게 보낼 과목 리스트 정보
const emits = defineEmits(["update-courses"]);
// 페이지 로드될 때, 초기 실행 함수
onMounted(async () => {
  // 초기 강의 목록과 페이지 개수 설정
  await getCourses();
  calculateTotalPages(courses.value.length); // Assuming you have the total number of courses available
});

// 페이지에 해당하는 강의목록 받아오기
const getCourses = async () => {
  // 페이지별 get요청
  const { getData } = useGetAxios(`${serverPath}/${currentPage.value}`);
  const response = await getData();
  // 경로 제대로 받아올 때
  if (response.status === 200) {
    courses.value = response.data;
    // 부모에게 강의목록 전송
    emits("update-courses", courses.value);
    console.log(courses.value);
  } else {
    alert("Pagination error");
  }
};
// 동적 경로 설정 함수
const getLink = (page) => {
  return `${currentPath.value}/${page}`;
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
a {
  color: var(--main-color);
}
</style>
