import Vue from "vue";
import Vuex from "vuex";
import service from "@/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accesstoken: null,
    userinfo: null,
    collects: null
  },
  mutations: {
    login(state, payload) {
      state.accesstoken = payload.accesstoken;
      state.userinfo = payload.userinfo;
    },
    logout(state) {
      state.accesstoken = null;
      state.userinfo = null;
      state.collects = null
    },
    updateCollects(state, collects) {
      state.collects = collects;
    }
  },
  actions: {
    async postAccessToken(context, accesstoken) {
      try {
        let result = await service.postAccessToken(accesstoken);
        context.commit("login", { accesstoken, userinfo: result });
        window.localStorage.setItem("accesstoken", accesstoken);
        return await { success: true, accesstoken, userinfo: result };
      } catch (error) {
        return await { success: false, msg: error };
      }
    },
    async logout(context) {
      try {
        window.localStorage.removeItem("accesstoken");
        context.commit("logout");
        return await { success: true };
      } catch (error) {
        console.log(error);
        return await { success: false };
      }
    },
    async getCollects(context, username) {
      try {
        let result = await service.getCollects(username);
        context.commit("updateCollects", result.data);
        return await { success: true, collect: result.data };
      } catch (error) {
        return await { success: false, msg: error };
      }
    }
  }
});
