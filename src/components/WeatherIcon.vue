<template>
  {{ conditionCode }}
  <img class="klear" :src="icon" :style="{ 'max-width': '50px' }" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const { condition } = defineProps<{
  condition: string;
}>();

const iconConditionMap: Record<string, number> = {
  Tornado: 0,
  'Tropical Storm': 1,
  'Freezing Rain': 10,
  Showers: 11,
  Rain: 12,
  Flurries: 13,
  'Snow Showers': 14,
  'Blowing Snow': 15,
  Snow: 16,
  Hail: 17,
  Sleet: 18,
  Dust: 19,
  Hurricane: 2,
  Fog: 20,
  Haze: 21,
  Smoke: 22,
  Breezy: 23,
  Windy: 24,
  Frigid: 25,
  Cloudy: 26,
  'Mostly Cloudy': 27,
  'Partly Cloudy Night': 29,
  'Severe Thunderstorm': 3,
  'Partly Cloudy Day': 30,
  Clear: 31,
  Sunny: 32,
  'Mostly Clear': 33,
  'Mostly Sunny': 34,
  'Mixed Rainfall': 35,
  Hot: 36,
  'Isolated Thunderstorms': 37,
  'Scattered Thunderstorms': 38,
  'Scattered Showers': 39,
  Thunderstorm: 4,
  'Heavy Rain': 40,
  'Scattered Snow Showers': 41,
  'Heavy Snow': 42,
  Blizzard: 43,
  Loading: 44,
  'Cloudy Scattered Snow Showers': 46,
  'Isolated Thundershowers': 47,
  'Mixed Rain and Snow': 5,
  'Mixed Rain and Sleet': 6,
  'Mixed Snow and Sleet': 7,
  'Freezing Drizzle': 8,
  Drizzle: 9,
};

const conditionCode = iconConditionMap[condition] ?? 32;

const icon = computed(() => `/Klear/${conditionCode}.png`);
</script>

<style>
.klear {
  flex-shrink: 0;
}
</style>
