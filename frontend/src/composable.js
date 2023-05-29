import axios from "axios";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

// 서버에 get요청하기
export function useGetAxios(url) {
  async function getData() {
    try {
      const response = await axios.get(url);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error.response) {
        // The error was a response from the server
        return { data: null, status: error.response.status };
      } else {
        // Other types of errors
        console.error(error);
      }
    }
  }
  return {
    getData,
  };
}
// 서버에 post요청하기
export function usePostAxios(url, data = null) {
  async function postData() {
    try {
      const response = await axios.post(url, data);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error.response) {
        // The error was a response from the server
        return { data: null, status: error.response.status };
      } else {
        // Other types of errors
        console.error(error);
      }
    }
  }
  return {
    postData,
  };
}
// 로그인 유무 받아오기
export async function loginCheck(url) {
  const { getData } = useGetAxios(url);
  const response = await getData();
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
// 유저정보 로컬스토리지에 저장하기
export function saveUser(userData) {
  localStorage.setItem("user-Info", JSON.stringify(userData));
}
// 유저정보 로컬스토리지로부터 받아오기
export function loadUser() {
  const savedData = localStorage.getItem("user-Info");
  return JSON.parse(savedData);
}
// 유저정보 로컬스토리지에 삭제하기
export function deleteUser() {
  localStorage.removeItem("user-Info");
}
// 유저정보 반응형 설정
export function setRef() {
  const userData = ref(loadUser());

  watch(
    () => localStorage.getItem("user-Info"),
    (newValue) => {
      userData.value = JSON.parse(newValue);
    }
  );

  return userData;
}
// 현재 경로의 페이지 이름 받아오기
export function usePageName() {
  const route = useRoute();
  const matchingRoutes = route.matched
    .filter((route) => route.path.includes("/"))
    .map((route) => route.name);
  return matchingRoutes.length ? matchingRoutes : ["not mathing page"];
}

// 현재 페이지 경로 받아오기
export function usePagePath() {
  const route = useRoute();
  return route.path;
}
