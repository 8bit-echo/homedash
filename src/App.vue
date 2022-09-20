<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- <keep-alive> -->
        <component :is="Component" />
      <!-- </keep-alive> -->
    </router-view>
    <Nav />
  </div>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue';
</script>
