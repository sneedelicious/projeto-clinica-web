import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userRole: state => state.user ? state.user.role : null
  }
});