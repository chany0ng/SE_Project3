<template>
  <router-view></router-view>
  <main v-if="isRendered">
    <StudentHeader />
    <!-- <Asidebar /> -->
    <div id="list-table">
      <table class="table table-sm table-hover" style="font-size: small">
        <thead style="font-size: 1.1rem">
          <tr>
            <th scope="col">수강 과목 현황</th>
            <th scope="col">과제</th>
            <th scope="col">공지사항</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(course, index) of filteredCourses" :key="index">
            <th scope="row">
              {{ course.subject.subject_name }}
              <button
                style="
                  color: red;
                  font-size: small;
                  float: left;
                  border-style: none;
                "
                @click="deleteSubject(course)"
              >
                X
              </button>
            </th>
            <td>새로운 과제가 없습니다!</td>
            <td>새로운 공지사항이 없습니다!</td>
          </tr>
        </tbody>
      </table>
    </div>
    <select id="select" v-model="yearSemester" style="margin-top: 10px">
      <option value="2023/2" selected>2023학년도 2학기</option>
      <option value="2023/1">2023학년도 1학기</option>
      <option value="2022/2">2022학년도 2학기</option>
      <option value="2022/1">2022학년도 1학기</option>
      <option value="2021/2">2021학년도 2학기</option>
      <option value="2021/1">2021학년도 1학기</option>
      <option value="2020/1">2020학년도 2학기</option>
      <option value="2020/1">2020학년도 1학기</option>
    </select>

    <div>
      <table id="time-table">
        <tr id="row-header">
          <th></th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
        <tr>
          <td>1교시</td>
          <td
            ref="월1"
            v-text="timeTable.월1.시간"
            :style="`background-color: ${timeTable.월1.배경}`"
          ></td>
          <td
            ref="화1"
            v-text="timeTable.화1.시간"
            :style="`background-color: ${timeTable.화1.배경}`"
          ></td>
          <td
            ref="수1"
            v-text="timeTable.수1.시간"
            :style="`background-color: ${timeTable.수1.배경}`"
          ></td>
          <td
            ref="목1"
            v-text="timeTable.목1.시간"
            :style="`background-color: ${timeTable.목1.배경}`"
          ></td>
          <td
            ref="금1"
            v-text="timeTable.금1.시간"
            :style="`background-color: ${timeTable.금1.배경}`"
          ></td>
          <td
            ref="토1"
            v-text="timeTable.토1.시간"
            :style="`background-color: ${timeTable.토1.배경}`"
          ></td>
        </tr>
        <tr>
          <td>2교시</td>
          <!-- <td v-for="(course, index) of subjectData" :key="index">
            {{ course.subject.subject_name }}
          </td> -->
          <td
            ref="월2"
            v-text="timeTable.월2.시간"
            :style="`background-color: ${timeTable.월2.배경}`"
          ></td>
          <td
            ref="화2"
            v-text="timeTable.화2.시간"
            :style="`background-color: ${timeTable.화2.배경}`"
          ></td>
          <td
            ref="수2"
            v-text="timeTable.수2.시간"
            :style="`background-color: ${timeTable.수2.배경}`"
          ></td>
          <td
            ref="목2"
            v-text="timeTable.목2.시간"
            :style="`background-color: ${timeTable.목2.배경}`"
          ></td>
          <td
            ref="금2"
            v-text="timeTable.금2.시간"
            :style="`background-color: ${timeTable.금2.배경}`"
          ></td>
          <td
            ref="토2"
            v-text="timeTable.토2.시간"
            :style="`background-color: ${timeTable.토2.배경}`"
          ></td>
        </tr>
        <tr>
          <td>3교시</td>
          <td
            ref="월3"
            v-text="timeTable.월3.시간"
            :style="`background-color: ${timeTable.월3.배경}`"
          ></td>
          <td
            ref="화3"
            v-text="timeTable.화3.시간"
            :style="`background-color: ${timeTable.화3.배경}`"
          ></td>
          <td
            ref="수3"
            v-text="timeTable.수3.시간"
            :style="`background-color: ${timeTable.수3.배경}`"
          ></td>
          <td
            ref="목3"
            v-text="timeTable.목3.시간"
            :style="`background-color: ${timeTable.목3.배경}`"
          ></td>
          <td
            ref="금3"
            v-text="timeTable.금3.시간"
            :style="`background-color: ${timeTable.금3.배경}`"
          ></td>
          <td
            ref="토3"
            v-text="timeTable.토3.시간"
            :style="`background-color: ${timeTable.토3.배경}`"
          ></td>
        </tr>
        <tr>
          <td>4교시</td>
          <td
            ref="월4"
            v-text="timeTable.월4.시간"
            :style="`background-color: ${timeTable.월4.배경}`"
          ></td>
          <td
            ref="화4"
            v-text="timeTable.화4.시간"
            :style="`background-color: ${timeTable.화4.배경}`"
          ></td>
          <td
            ref="수4"
            v-text="timeTable.수4.시간"
            :style="`background-color: ${timeTable.수4.배경}`"
          ></td>
          <td
            ref="목4"
            v-text="timeTable.목4.시간"
            :style="`background-color: ${timeTable.목4.배경}`"
          ></td>
          <td
            ref="금4"
            v-text="timeTable.금4.시간"
            :style="`background-color: ${timeTable.금4.배경}`"
          ></td>
          <td
            ref="토4"
            v-text="timeTable.토4.시간"
            :style="`background-color: ${timeTable.토4.배경}`"
          ></td>
        </tr>
        <tr>
          <td>5교시</td>
          <td
            ref="월5"
            v-text="timeTable.월5.시간"
            :style="`background-color: ${timeTable.월5.배경}`"
          ></td>
          <td
            ref="화5"
            v-text="timeTable.화5.시간"
            :style="`background-color: ${timeTable.화5.배경}`"
          ></td>
          <td
            ref="수5"
            v-text="timeTable.수5.시간"
            :style="`background-color: ${timeTable.수5.배경}`"
          ></td>
          <td
            ref="목5"
            v-text="timeTable.목5.시간"
            :style="`background-color: ${timeTable.목5.배경}`"
          ></td>
          <td
            ref="금5"
            v-text="timeTable.금5.시간"
            :style="`background-color: ${timeTable.금5.배경}`"
          ></td>
          <td
            ref="토5"
            v-text="timeTable.토5.시간"
            :style="`background-color: ${timeTable.토5.배경}`"
          ></td>
        </tr>
        <tr>
          <td>6교시</td>
          <td
            ref="월6"
            v-text="timeTable.월6.시간"
            :style="`background-color: ${timeTable.월6.배경}`"
          ></td>
          <td
            ref="화6"
            v-text="timeTable.화6.시간"
            :style="`background-color: ${timeTable.화6.배경}`"
          ></td>
          <td
            ref="수6"
            v-text="timeTable.수6.시간"
            :style="`background-color: ${timeTable.수6.배경}`"
          ></td>
          <td
            ref="목6"
            v-text="timeTable.목6.시간"
            :style="`background-color: ${timeTable.목6.배경}`"
          ></td>
          <td
            ref="금6"
            v-text="timeTable.금6.시간"
            :style="`background-color: ${timeTable.금6.배경}`"
          ></td>
          <td
            ref="토6"
            v-text="timeTable.토6.시간"
            :style="`background-color: ${timeTable.토6.배경}`"
          ></td>
        </tr>
        <tr>
          <td>7교시</td>
          <td
            ref="월7"
            v-text="timeTable.월7.시간"
            :style="`background-color: ${timeTable.월7.배경}`"
          ></td>
          <td
            ref="화7"
            v-text="timeTable.화7.시간"
            :style="`background-color: ${timeTable.화7.배경}`"
          ></td>
          <td
            ref="수7"
            v-text="timeTable.수7.시간"
            :style="`background-color: ${timeTable.수7.배경}`"
          ></td>
          <td
            ref="목7"
            v-text="timeTable.목7.시간"
            :style="`background-color: ${timeTable.목7.배경}`"
          ></td>
          <td
            ref="금7"
            v-text="timeTable.금7.시간"
            :style="`background-color: ${timeTable.금7.배경}`"
          ></td>
          <td
            ref="토7"
            v-text="timeTable.토7.시간"
            :style="`background-color: ${timeTable.토7.배경}`"
          ></td>
        </tr>
        <tr>
          <td>8교시</td>
          <td
            ref="월8"
            v-text="timeTable.월8.시간"
            :style="`background-color: ${timeTable.월8.배경}`"
          ></td>
          <td
            ref="화8"
            v-text="timeTable.화8.시간"
            :style="`background-color: ${timeTable.화8.배경}`"
          ></td>
          <td
            ref="수8"
            v-text="timeTable.수8.시간"
            :style="`background-color: ${timeTable.수8.배경}`"
          ></td>
          <td
            ref="목8"
            v-text="timeTable.목8.시간"
            :style="`background-color: ${timeTable.목8.배경}`"
          ></td>
          <td
            ref="금8"
            v-text="timeTable.금8.시간"
            :style="`background-color: ${timeTable.금8.배경}`"
          ></td>
          <td
            ref="토8"
            v-text="timeTable.토8.시간"
            :style="`background-color: ${timeTable.토8.배경}`"
          ></td>
        </tr>
      </table>
    </div>
  </main>
  <MainFooter />
</template>

<script setup>
import { onMounted, computed, ref, reactive, watch } from "vue";
import { loginCheck, usePostAxios } from "@/composable";
import MainFooter from "../../layouts/MainFooter.vue";
import StudentHeader from "../../layouts/StudentHeader.vue";
import router from "@/router";
import store from "@/store";
// import Asidebar from "../../layouts/AsideBar.vue";

//로그인 유무 받아오기
onMounted(async () => {
  const loggedIn = await loginCheck("/api/student");
  if (loggedIn === false) {
    alert("로그인 해야합니다!");
    router.push("/login");
  } else {
    getTime();
    isRendered.value = true;
  }
});
const isRendered = ref(false);
const subjectData = computed(() => store.getters["subjectInfo/getSubject"]);
// 선택된 학년/학기에 맞는 강좌들만 필터링
const filteredCourses = computed(() => {
  const year = yearSemester.value.split("/")[0];
  const semester = yearSemester.value.split("/")[1];
  return subjectData.value.filter((course) => {
    return course.year == year && course.semester == semester;
  });
});
const yearSemester = ref("2023/2"); // 초기 값 설정
// 시간표 변수
const timeTable = reactive({
  월1: {
    시간: "",
    배경: "",
  },
  월2: {
    시간: "",
    배경: "",
  },
  월3: {
    시간: "",
    배경: "",
  },
  월4: {
    시간: "",
    배경: "",
  },
  월5: {
    시간: "",
    배경: "",
  },
  월6: {
    시간: "",
    배경: "",
  },
  월7: {
    시간: "",
    배경: "",
  },
  월8: {
    시간: "",
    배경: "",
  },
  화1: {
    시간: "",
    배경: "",
  },
  화2: {
    시간: "",
    배경: "",
  },
  화3: {
    시간: "",
    배경: "",
  },
  화4: {
    시간: "",
    배경: "",
  },
  화5: {
    시간: "",
    배경: "",
  },
  화6: {
    시간: "",
    배경: "",
  },
  화7: {
    시간: "",
    배경: "",
  },
  화8: {
    시간: "",
    배경: "",
  },
  수1: {
    시간: "",
    배경: "",
  },
  수2: {
    시간: "",
    배경: "",
  },
  수3: {
    시간: "",
    배경: "",
  },
  수4: {
    시간: "",
    배경: "",
  },
  수5: {
    시간: "",
    배경: "",
  },
  수6: {
    시간: "",
    배경: "",
  },
  수7: {
    시간: "",
    배경: "",
  },
  수8: {
    시간: "",
    배경: "",
  },
  목1: {
    시간: "",
    배경: "",
  },
  목2: {
    시간: "",
    배경: "",
  },
  목3: {
    시간: "",
    배경: "",
  },
  목4: {
    시간: "",
    배경: "",
  },
  목5: {
    시간: "",
    배경: "",
  },
  목6: {
    시간: "",
    배경: "",
  },
  목7: {
    시간: "",
    배경: "",
  },
  목8: {
    시간: "",
    배경: "",
  },
  금1: {
    시간: "",
    배경: "",
  },
  금2: {
    시간: "",
    배경: "",
  },
  금3: {
    시간: "",
    배경: "",
  },
  금4: {
    시간: "",
    배경: "",
  },
  금5: {
    시간: "",
    배경: "",
  },
  금6: {
    시간: "",
    배경: "",
  },
  금7: {
    시간: "",
    배경: "",
  },
  금8: {
    시간: "",
    배경: "",
  },
  토1: {
    시간: "",
    배경: "",
  },
  토2: {
    시간: "",
    배경: "",
  },
  토3: {
    시간: "",
    배경: "",
  },
  토4: {
    시간: "",
    배경: "",
  },
  토5: {
    시간: "",
    배경: "",
  },
  토6: {
    시간: "",
    배경: "",
  },
  토7: {
    시간: "",
    배경: "",
  },
  토8: {
    시간: "",
    배경: "",
  },
});
const splitTime = ref([]);
// 수강 과목 리스트가 변경될 때 마다 getTime함수 실행.
watch(subjectData, () => {
  getTime();
});
watch(filteredCourses, () => {
  getTime();
});
watch(yearSemester, () => {
  getTime();
});
// 강의 듣는 날짜와 시간 저장하는 함수
function getTime() {
  clearTable();
  for (const arrayKey in filteredCourses.value) {
    const currentArray = filteredCourses.value[arrayKey];
    const time = currentArray.subject.subject_time;
    const time2 = time.split("/");
    // 각 강의 시간을 배열에 저장.
    const color = getRandomColor();
    for (const item of time2) {
      splitTime.value.push(item);
      timeTable[item].시간 = currentArray.subject.subject_name;
      timeTable[item].배경 = color;
    }
  }
}

// 시간표 비우는 함수
function clearTable() {
  for (const key in timeTable) {
    timeTable[key].시간 = "";
    timeTable[key].배경 = "";
  }
}
// 랜덤 컬러 받아오기
function getRandomColor() {
  const letters = "456789ABCDE";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 11)];
  }
  return color;
}

// 수강 삭제 버튼 클릭 시 실행 함수
async function deleteSubject(course) {
  const { postData } = usePostAxios("/api/student/enrollment/delete", course);
  const response = await postData();
  if (response.status === 200) {
    const mySubject = response.data;
    store.dispatch("subjectInfo/setSubject", mySubject);
    alert("과목이 삭제되었습니다");
  } else {
    alert("과목 삭제 실패!");
  }
}
</script>

<style scoped>
#list-table {
  background-color: white;
  width: 55vw;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main2-color);
  border-radius: 10px;
  color: #ee7474;
}

#time-table {
  text-align: center;
  border-collapse: collapse;
  width: 65vw;
  background-color: white;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--main2-color);
  border-radius: 10px;
  table-layout: fixed;
}
#time-table tr td:first-child {
  font-size: small;
  padding: 1px;
  border: 1px solid var(--main2-color);
  width: 10px;
  height: 70px;
}
#time-table tr td:nth-child(n + 2) {
  border: 1px solid var(--main2-color);
  padding: 8px;
  height: 70px;
  width: 70px;
  font-size: medium;
  font-weight: bold;
}
#time-table th {
  border-left: 1px solid var(--main2-color);
}
#row-header {
  background-color: floralwhite;
  padding: 3px;
}
</style>
