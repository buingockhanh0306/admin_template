import { getField, updateField } from "vuex-map-fields";
export const state = () => ({
  dataTable: [],
});

export const actions = {
  async getListPost({ commit }) {
    const result = await this.$axios.get("/posts");
    commit("SET_LIST_POST", result.data.posts);
  },
  createPost({ commit }, payload) {
    return this.$axios.post("/posts/create", payload);
  },
  deletePost({ commit }, payload) {
    return this.$axios.delete(`/posts/${payload.id}`);
  },
};

export const mutations = {
  updateField,
  SET_LIST_POST(state, data) {
    state.dataTable = data;
  },
};

export const getters = {
  getField,
};
