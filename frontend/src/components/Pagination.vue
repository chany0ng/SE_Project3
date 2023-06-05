<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
      <li class="page-item">
        <router-link
          :to="getLink(currentPage - 1)"
          class="page-link"
          @click="prevPage"
          :class="{ 'disabled-link': currentPage === 1 }"
          >이전으로</router-link
        >
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page">
        <router-link
          :to="getLink(page)"
          @click="movePage(page)"
          class="page-link"
        >
          {{ page }}
        </router-link>
      </li>
      <li class="page-item">
        <router-link
          :to="getLink(currentPage + 1)"
          class="page-link"
          @click="nextPage"
          :class="{ 'disabled-link': currentPage === totalPages }"
          >다음으로</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, toRef } from "vue";
import { useGetAxios, usePostAxios } from "@/composable";
const currentPage = ref(1);
const perPage = 10; // Number of courses per page
const courses = ref([]);
const totalPages = ref(0);
const totalCourses = ref(0);

// 부모로 부터 받은 경로 설정
const props = defineProps({
  path: String,
  keyword: Object,
});
// 넘어온 원본 경로
const currentPath = toRef(props, "path");
// 넘어온 검색어
const searchKeyword = toRef(props, "keyword");
// axios요청 할 서버 경로
const serverPath = "/api" + currentPath.value;
// 부모에게 보낼 과목 리스트 정보
const emits = defineEmits(["update-courses"]);

// 페이지 로드될 때, 초기 실행 함수
onMounted(async () => {
  // 초기 강의 목록과 페이지 개수 설정
  await getCourses();
  calculateTotalPages(totalCourses.value); // 강의 총 개수 / 10 = page개수
});

// 페이지에 해당하는 강의목록 받아오기
const getCourses = async () => {
  console.log("get: ", currentPath.value);
  console.log("get: ", searchKeyword.value.word);

  // 검색어 없을 때
  if (searchKeyword.value.word === "") {
    console.log("검색어 없음");
    // 페이지별 get요청
    const { getData } = useGetAxios(`${serverPath}/${currentPage.value}`);
    const response = await getData();
    // 경로 제대로 받아올 때
    if (response.status === 200) {
      courses.value = response.data[0];
      // 부모에게 강의목록 전송
      emits("update-courses", courses.value);
      totalCourses.value = response.data[1];
    } else {
      alert("Pagination error");
    }
  }
  // 검색어가 있을 때
  else {
    console.log("검색어 있음");

    // 검색 후 페이지별 post요청
    const { getData } = useGetAxios(
      `${serverPath}/${currentPath.value}/${searchKeyword.value.word}`
    );
    const response = await getData();
    // 경로 제대로 받아올 때
    if (response.status === 200) {
      courses.value = response.data[0];
      // 부모에게 강의목록 전송
      emits("update-courses", courses.value);
      totalCourses.value = response.data[1];
    } else {
      alert("Search Pagination error");
    }
  }
};

// 동적 경로 설정 함수
const getLink = (page) => {
  if (searchKeyword.value.word === "") {
    return `${currentPath.value}/${page}`;
  } else {
    return `${currentPath.value}/${page}/${searchKeyword.value.word}`;
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
// 숫자 페이지 클릭 시 실행 함수
const movePage = async (page) => {
  if (page > 0 && page < totalPages.value + 1) {
    currentPage.value = page;
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
a:hover {
  opacity: 0.8;
  color: var(--main-color);
}
.disabled-link {
  color: gray;
  cursor: default;
  pointer-events: none;
}
.page-link:focus,
.page-link:active {
  box-shadow: none;
  color: var(--main-color);
}
</style>
