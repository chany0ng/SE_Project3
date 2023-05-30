// Vuex Store 관련 파일을 등록하고 통합한다.

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import userInfo from "./modules/userInfo";
import subjectInfo from "./modules/subjectInfo";
const store = createStore({
  modules: {
    userInfo: userInfo,
    subjectInfo: subjectInfo,
  },
  plugins: [
    createPersistedState({
      //주목! : 여기에 쓴 모듈만 저장됩니다.
      paths: ["userInfo", "subjectInfo"],
    }),
  ],
});

export default store;
