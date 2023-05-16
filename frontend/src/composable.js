import axios from "axios";
import { useRoute } from "vue-router";

// 서버에 get요청하기
export function useGetAxios(url) {
  async function getData() {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  return {
    getData,
  };
}
// 서버에 post요청하기
export function usePostAxios(url, data = null) {
  async function getData() {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  return {
    getData,
  };
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
