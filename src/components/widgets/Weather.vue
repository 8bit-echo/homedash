<template>
  <div class="weather" v-if="forecast.length">
    <div class="period featured">
      <div class="forecastSummary">
        <WeatherIcon :condition="forecast[0].shortForecast" />
        <div>
          <h4>{{ forecast[0].name }} - {{ forecast[0].temperature }}°</h4>
          {{ forecast[0].detailedForecast }}
        </div>
      </div>
    </div>
    <hr />
    <div class="forecast">
      <div v-for="period in forecast.slice(1)" class="period">
        <div class="forecastSummary">
          <WeatherIcon :condition="period.shortForecast" />
          <div>
            <h4>{{ period.name }} - {{ period.temperature }}°</h4>
            {{ period.shortForecast }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error">{{ error }} :(</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import USWeather from '../../utils/Weather';
import { useStore } from '../../hooks/useStore';
import { WeatherPeriod } from '../../types/weather';
import WeatherIcon from '../WeatherIcon.vue';

const store = useStore();

const forecast = computed<WeatherPeriod[]>(() => store.state.weather?.forecast || []);
const error = ref<string | null>(null);

onMounted(async () => {
  if (!store.state.weather?.forecast.length) {
    try {
      const weatherService = new USWeather({ cwa: 'BOU', gridX: 54, gridY: 73 });
      const fc = await weatherService.getForecast();
      store.commit(
        'weather/setForecast',
        fc.filter((f, i) => i === 0 || f.isDaytime)
      );
    } catch {
      error.value = 'Weather service unavailable';
    }
  }
});
</script>

<style lang="scss" scoped>
.weather {
  width: 35vw;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  margin: 20px;
  border-radius: 1rem;
}

h4 {
  margin: 0;
}

.forecast {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.period {
  text-align: left;
}
.period.featured {
  margin: 10px 0;
  font-size: 1.5rem;
  line-height: 1.3;
}

.forecastSummary {
  display: flex;
  align-items: center;
}

.forecast p {
  margin: 0;
}
</style>
