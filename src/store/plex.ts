import { Module } from 'vuex';
import { AppStore } from './State';

export interface PlexState {
  ipAddress?: string;
}

const plex: Module<PlexState, AppStore> = {
  namespaced: true,
  state: {
    ipAddress: localStorage.getItem('plex/ipAddress') ?? undefined,
  },
  getters: {},
  mutations: {
    setIpAddress(state, payload) {
      state.ipAddress = payload;
      localStorage.setItem('plex/ipAddress', payload);
    },
  },
  actions: {},
  modules: {},
};

export default plex;
