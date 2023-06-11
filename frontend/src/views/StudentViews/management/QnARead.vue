<template>
  <div v-if="isRendered">
    <StudentHeader />
    <Background>
      <template v-slot:title>
        <h4>강의묻고 답하기</h4>
      </template>
      <template v-slot:content>
        <div id="form-container">
          <div id="title-container">
            <div style="font-size: larger">
              {{ selectedPost.QnA_title }}
            </div>
            <span>작성자: {{ selectedPost.student.name }}</span>
            <span>등록일: {{ selectedPost.createdAt }}</span>
          </div>
          <div id="content-container">
            {{ selectedPost.QnA_description }}
          </div>
        </div>
      </template>
    </Background>
    <MainFooter />
  </div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from "vue";
import { loginCheck, useGetAxios, usePostAxios } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import Background from "@/components/Background.vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import NoserachPagination from "@/components/Noserach-Pagination.vue";
NoserachPagination;

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student/subject/qna");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    selectedPost.value = getPost(postId.value);
    isRendered.value = true;
  }
});

const router = useRouter();
const isRendered = ref(false);

// url에 포함된 params를 읽어오기
const route = useRoute();
const subjectId = computed(() => route.params.id);
const postId = computed(() => route.params.number);
const selectedPost = ref();

// QnA_id에 해당하는 게시글 객체 얻기
function getPost(number) {
  const qnaList = computed(() => store.getters["qnaInfo/getQna"]);
  const post = qnaList.value.find((qna) => qna.QnA_id == number);
  return post;
}
</script>

<style scoped>
#writeBtn {
  border: 1px solid var(--main2-color);
  background-color: var(--main3-color);
  color: var(--main-color);
}
a {
  text-decoration: none;
  color: var(--main-color);
}
#form-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
#title-container {
  background-color: var(--main3-color);
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  padding: 10px;
}
#content-container {
  height: 30vh;
  text-align: left;
  line-height: 1.8rem;
  border-bottom: 1px solid black;
  padding: 10px;
}
span {
  font-size: small;
  font-weight: lighter;
  margin: 5px 10px 5px 0px;
}
</style>
