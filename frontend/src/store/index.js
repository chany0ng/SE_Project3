// Vuex Store 관련 파일을 등록하고 통합한다.

import { createStore } from "vuex";
import myModule from "./modules/store";
import userInfo from "./modules/userInfo";
const store = createStore({
  modules: {
    myModule: myModule,
    userInfo: userInfo,
  },
});

export default store;
