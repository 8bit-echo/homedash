import { createStore, Store } from 'vuex';
import { AppStore } from './State';
import { InjectionKey } from 'vue';
import hue from './hue';
import weather from './weather';
import plex from './plex';
import { webpages } from './webpages';

// define your typings for the store state

// define injection key
export const key: InjectionKey<Store<AppStore>> = Symbol();

export default createStore<AppStore>({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    hue,
    weather,
    webpages,
    plex,
  },
});
