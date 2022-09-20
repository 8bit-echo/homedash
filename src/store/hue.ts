import { Module } from 'vuex';
import { AppStore } from './State';

export interface HueState {
  ipAddress?: string;
}

const hue: Module<HueState, AppStore> = {
  namespaced: true,
  state: {
    ipAddress: localStorage.getItem('hue/ipAddress') ?? undefined,
  },
  getters: {},
  mutations: {
    setIpAddress(state, payload) {
      state.ipAddress = payload;
      localStorage.setItem('hue/ipAddress', payload);
    },
  },
  actions: {},
  modules: {},
};

export default hue;
