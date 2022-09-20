import { Module } from 'vuex';
import { WeatherPeriod } from '../types/weather';
import { AppStore } from './State';

export interface WeatherState {
  forecast: WeatherPeriod[];
}

const weather: Module<WeatherState, AppStore> = {
  namespaced: true,
  state: {
    forecast: [],
  },
  getters: {},
  mutations: {
    setForecast(state, forecast: WeatherPeriod[]) {
      state.forecast = forecast;
    }
  },
  actions: {},
  modules: {},
};

export default weather;
