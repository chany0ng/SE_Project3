<template>
  <div v-if="isRendered">
    <StudentHeader />
    <Background>
      <template v-slot:title>
        <h4>성적 조회</h4>
      </template>
      <template v-slot:content>
        <div clalss="container">
          <table class="tg" style="width: 100%; border: 1px solid black">
            <thead>
              <tr>
                <th class="tg-baqh">전체 이수 학점</th>
                <th class="tg-baqh">수강 완료 학점</th>
                <th class="tg-baqh">전체 평량평균</th>
                <th class="tg-baqh">전공 평량평균</th>
                <th class="tg-baqh">전공 외 평량평균</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-baqh">144</td>
                <td class="tg-baqh">{{ totalHakjum }}</td>
                <td class="tg-baqh">{{ totalGrade / semesterInfo.length }}</td>
                <td class="tg-baqh">{{ majorGrade / semesterInfo.length }}</td>
                <td class="tg-baqh">
                  {{ n_majorGrade / semesterInfo.length }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tg">
            <thead>
              <tr>
                <th class="tg-baqh" colspan="6">
                  학기별 수강/성적 결과
                  <select
                    id="select"
                    v-model="yearSemester"
                    style="margin-right: 10px"
                    class="my-dropdown"
                  >
                    <option value="2023/1" selected>2023학년도 1학기</option>
                    <option value="2022/2">2022학년도 2학기</option>
                    <option value="2022/1">2022학년도 1학기</option>
                    <option value="2021/2">2021학년도 2학기</option>
                    <option value="2021/1">2021학년도 1학기</option>
                    <option value="2020/2">2020학년도 2학기</option>
                    <option value="2020/1">2020학년도 1학기</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-wp8o">학정번호</td>
                <td class="tg-wp8o">과목명</td>
                <td class="tg-wp8o">이수학기</td>
                <td class="tg-wp8o">이수구분</td>
                <td class="tg-wp8o">학점</td>
                <td class="tg-wp8o">성적</td>
              </tr>
              <tr v-for="(course, index) of filteredSubject" :key="index">
                <td class="tg-wp8o">{{ course.subject_id }}</td>
                <td class="tg-wp8o">{{ course.subject.subject_name }}</td>
                <td class="tg-wp8o">{{ course.year }}-{{ course.semester }}</td>
                <td class="tg-wp8o">{{ course.subject.subject_type }}</td>
                <td class="tg-wp8o">{{ course.subject_subject_grade }}</td>
                <td class="tg-wp8o">{{ course.grade }}</td>
              </tr>
            </tbody>
          </table>
          <h2>학기별 성적 그래프</h2>
          <div style="width: 800px">
            <canvas id="gradeChart" width="580" height="200"></canvas>
          </div>
        </div>
      </template>
    </Background>
    <MainFooter />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch, reactive } from "vue";
import { loginCheck, useGetAxios } from "@/composable";
import MainFooter from "@/layouts/MainFooter.vue";
import StudentHeader from "@/layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";
import Background from "@/components/Background.vue";
import Chart from "chart.js/auto";

//로그인 유무 받아오기
onBeforeMount(async () => {
  const loggedIn = await loginCheck("/api/student/enrollment");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    await getGrades();
    const totalGrade = computed(() =>
      semesterInfo.value.reduce((total, obj) => total + obj.total_grade, 0)
    );
    const majorGrade = computed(() =>
      semesterInfo.value.reduce((total, obj) => total + obj.major_grade, 0)
    );
    const n_majorGrade = computed(() =>
      semesterInfo.value.reduce((total, obj) => total + obj.non_major_grade, 0)
    );

    isRendered.value = true;
  }
});

const isRendered = ref(false);
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);
// 학기 선택
const yearSemester = ref("2023/1");
console.log(yearSemester.value);
const year = computed(() => yearSemester.value.split("/")[0]);
const semester = computed(() => yearSemester.value.split("/")[1]);
const filteredSubject = ref(); // 학기 선택 후, 그 학기의 과목배열
const semesterInfo = ref();
const totalHakjum = ref();

watch(
  yearSemester,
  () => {
    const updatedYear = year.value;
    const updatedSemester = semester.value;
    console.log(updatedYear, updatedSemester);
    filteredSubject.value = subjectData.value.filter((item) => {
      return item.year == updatedYear && item.semester == updatedSemester;
    });
    console.log(filteredSubject.value);
  },
  { immediate: true }
);

async function getGrades() {
  const { getData } = useGetAxios("/api/student/studying/grade");
  const response = await getData();
  if (response.status === 200) {
    subjectData.value = response.data[0];
    semesterInfo.value = response.data[1];
    totalHakjum.value = response.data[2];
  } else {
    alert("성적 조회 에러발생!");
  }
}
</script>

<style scoped>
.container {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
}

h1 {
  font-size: 15px;
  margin-bottom: 20px;
  text-align: left;
}

h2 {
  font-size: 15px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
}

.my-dropdown {
  font-size: 13px;
  padding: 5px;
  border-radius: 5px;
  width: 150px;
}

.tg {
  border-collapse: collapse;
  border-color: #ccc;
  border-spacing: 0;
}

.tg td {
  background-color: #ffffff;
  border-color: #ccc;
  border-style: solid;
  border-width: 0px;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg th {
  background-color: #f0f0f0;
  border-color: #ccc;
  border-style: solid;
  border-width: 0px;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg .tg-baqh {
  text-align: center;
  vertical-align: top;
}

.tg .tg-wp8o {
  border-color: #000000;
  text-align: center;
  vertical-align: top;
}

canvas {
  border: 1px solid #949494;
}
</style>
