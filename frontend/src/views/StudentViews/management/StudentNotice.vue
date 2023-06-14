<template>
  <div v-if="isRendered">
    <StudentHeader />
    <Background>
      <template v-slot:title>
        <h4>강의 공지사항</h4>
        <select id="select" v-model="selectedSubject">
          <option v-for="(subject, index) of subjectData" :key="index">
            {{ subject.subject.subject_name }}
          </option>
        </select>
        <!-- <button id="writeBtn">
          <router-link :to="`/student/subject/qna/${subjectId}/write`"
            >글 등록</router-link
          >
        </button> -->
      </template>
      <template v-slot:content>
        <div>
          <table>
            <thead>
              <th scope="col" style="width: 10%">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
              <th scope="col">조회수</th>
            </thead>
            <tbody>
              <tr v-for="(notice, index) of noticeList" :key="index">
                <td>{{ noticeList.length - index }}</td>
                <td>
                  <router-link
                    :to="`/student/subject/notice/${subjectId}/${notice.notice_id}/read`"
                  >
                    {{ notice.QnA_title }}</router-link
                  >
                </td>
                <td>{{ notice.student.name }}</td>
                <td>{{ notice.createdAt }}</td>
                <td>{{ notice.notice_views }}</td>
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
import { onMounted, computed, ref, watch } from "vue";
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
  const loggedIn = await loginCheck("/api/student/subject/notice");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    isRendered.value = true;
  }
});

const router = useRouter();
const isRendered = ref(false);
const currentPath = ref("/student/subject/notice");
const noticeList = ref();
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);
const subjectId = ref(subjectData.value[0].subject_id);

// updateLists 이벤트 핸들러를 정의
const updateLists = (newList) => {
  noticeList.value = newList;
  store.dispatch("noticeInfo/setNotice", noticeList.value);
};
const selectedSubject = ref(subjectData.value[0].subject.subject_name);

// 과목 선택 시 실행되는 함수
watch(selectedSubject, (newValue) => {
  if (newValue) {
    // Access the selected subject's subject_id
    const selectedSubjectId = subjectData.value.find(
      (subject) => subject.subject.subject_name === newValue
    )?.subject.subject_id;
    if (selectedSubjectId) {
      subjectId.value = selectedSubjectId;
    }
  }
});
</script>

<style scoped>
#writeBtn {
  float: right;
  border: 1px solid var(--main2-color);
  background-color: var(--main3-color);
}
a {
  text-decoration: none;
  color: var(--main-color);
}
li {
  list-style: none;
}
table {
  width: 100%;
  border: 2px solid var(--main2-color);
  table-layout: fixed;
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
h4 {
  margin-bottom: 10px;
}
NoserachPagination {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
