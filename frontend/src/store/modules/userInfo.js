// import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
const persistedState = createPersistedState({
  key: "my-app",
  storage: window.localStorage,
});

const userInfo = {
  namespaced: true,
  plugins: [persistedState],
  // store.state로 접근, 직접 수정 x, mutations를 이용
  state: {},
  // store.getters로 접근
  getters: {},
  // store.commit으로 접근, 두번째 인수로 payload(데이터) 가능.
  mutations: {},
  // store.dispatch로 접근, context개체와 payload 인수로 가능.
  actions: {},
};
export default userInfo;
