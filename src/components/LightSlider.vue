<template>
  <div class="lightSlider">
    <div class="inner-container" :style="{ width: percentage }" />
    <input type="range" v-model="brightness" min="0" max="254" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from '../hooks/useStore';
import { ByteValue } from '../types/number';
import Hue from '../utils/Hue';
import map from '../utils/map';

const store = useStore();
const brightness = ref<ByteValue>(0);
const percentage = computed(() => `${map(brightness.value, 0, 254, 0, 100)}%`);
let hue: Hue | null = null;
const timeoutId = ref<number | null>(null);
const bulbId = 45;

if (store.state.hue?.ipAddress) {
  hue = new Hue(store.state.hue?.ipAddress, import.meta.env.VITE_HUE_USERNAME);
}

onMounted(async () => {
  if (hue) {
    const light = await hue.getLight(bulbId);
    brightness.value = light.state.bri;
  }
});

// debounce call to light controller
watch(brightness, (newVal) => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }

  timeoutId.value = setTimeout(() => {
    const bri = Number(newVal) as ByteValue;
    hue?.setBulbState(bulbId, { bri });
  }, 100);
});
</script>

<style scoped>
.lightSlider {
  position: relative;
  display: inline-flex;
  padding: 10px 0;
  width: 300px;
  height: 90px;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  transform: rotate(-90deg);
}

.inner-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(to right, rgba(244, 221, 140, 0.95), #f5f5f5);
}
input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}

/* This is the "grabber" of the range slider */
input[type='range' i]::-webkit-slider-thumb {
  border: solid 40px #000;
  margin-left: -40px;
}
</style>
