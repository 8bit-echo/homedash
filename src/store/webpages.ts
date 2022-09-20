import { Module } from 'vuex';
import { AppStore } from './State';

export interface WebPageState {
  pages: string[];
}

const webpages: Module<WebPageState, AppStore> = {
  namespaced: true,
  state: {
    pages: JSON.parse(localStorage.getItem('pages') || '[]'),
  },
  getters: {},
  mutations: {
    addPage(state, page) {
      state.pages.push(page);
      localStorage.setItem('pages', JSON.stringify(state.pages));
    }
  },
  actions: {},
  modules: {},
};

export { webpages };
