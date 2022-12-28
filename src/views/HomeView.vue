<template>
  <div class="home">
    <button  id="refresh" @click="refresh()">Refresh</button>
    <DigitalClock />
    <Weather />
    <LightSlider />
  </div>
</template>

<script setup lang="ts">
import Weather from '../components/widgets/Weather.vue';
import DigitalClock from '../components/widgets/DigitalClock.vue';
import LightSlider from '../components/LightSlider.vue';

const refresh = () => {
  window.location.reload();
};
</script>

<style>
  .home {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  #refresh {
    position: absolute;
    top: 160px;
    right: 20px;
  }
</style>
