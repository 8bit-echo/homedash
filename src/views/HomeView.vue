<template>
  <div class="home">
    <button @click="refresh()">Refresh</button>
    <DigitalClock />
    <Weather />
  </div>
</template>

<script setup lang="ts">
import Weather from '../components/widgets/Weather.vue';
import DigitalClock from '../components/widgets/DigitalClock.vue';

const refresh = () => {
  window.location.reload();
};
</script>
