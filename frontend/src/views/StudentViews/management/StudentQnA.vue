<template>
  <div v-if="isRendered">
    <StudentHeader />
    <Background>
      <template v-slot:title>
        <h4>강의묻고 답하기</h4>
        <select id="select" v-model="selectedSubject">
          <option
            v-for="(subject, index) of subjectData"
            :key="index"
            @click="pickSubject(subject.subject.subject_id)"
          >
            {{ subject.subject.subject_name }}
          </option>
        </select>
        <button @click="writeQnA">글쓰기</button>
      </template>
      <template v-slot:content>
        <div>
          <table>
            <thead>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </thead>
            <tbody>
              <tr
                v-for="(qna, index) of qnaList"
                :key="index"
                @click="clickQnA(qna)"
              >
                <td>{{ qnaList.length - index }}</td>
                <td>{{ qna.QnA_title }}</td>
                <td>{{ qna.subject_id.name }}</td>
                <td>{{ qna.updatedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-slot:pagination>
        <NoserachPagination
          :path="currentPath"
          :subject_id="subjectId"
          @update-lists="updateLists"
        />
      </template>
    </Background>
    <MainFooter />
  </div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from "vue";
import { loginCheck, useGetAxios } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import Background from "@/components/Background.vue";
import store from "@/store";
import { useRouter } from "vue-router";
import NoserachPagination from "@/components/Noserach-Pagination.vue";
NoserachPagination;

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student/subject/qna");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    isRendered.value = true;
  }
});

const router = useRouter();
const isRendered = ref(false);
const currentPath = ref("/student/subject/qna");
const subjectId = ref(subjectData.value[0].subject_id);
const qnaList = ref();
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);

// updateLists 이벤트 핸들러를 정의
const updateLists = (newList) => {
  qnaList.value = newList;
};

// 글쓰기 버튼 클릭 실행 함수
function writeQnA() {
  router.push(`/student/subject/qna/${subjectId.value}/write`);
}
// 서버한테 QnA 게시물 등록 요청
async function getQnaList() {
  const { getData } = useGetAxios("/api/student/subject/qna/:id");
  const response = await getData();
  if (response.status == 200) {
    alert("좋아");
  } else {
    alert("나빠");
  }
}

// 옵션에서 과목 선택했을 때 실행되는 함수
function pickSubject(id) {
  subjectId.value = id;
  alert("pick!");
}
</script>

<style scoped>
li {
  list-style: none;
}
table {
  width: 100%;
  border: 2px solid var(--main2-color);
}
thead {
  font-size: smaller;
  background-color: var(--main2-color);
}
tr {
  border-bottom: 2px solid var(--main2-color);
}
tr:hover {
  background-color: var(--main3-color);
}
tbody,
td,
tfoot,
th,
thead,
tr {
  padding: 7px;
}
NoserachPagination {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
