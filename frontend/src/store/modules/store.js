// import axios from 'axios'

const myModule = {
  namespaced: true,
  // store.state로 접근, 직접 수정 x, mutations를 이용
  state: {
    count: 0,
  },
  // store.getters로 접근
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  // store.commit으로 접근, 두번째 인수로 payload(데이터) 가능.
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  // store.dispatch로 접근, context개체와 payload 인수로 가능.
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
};
export default myModule;
