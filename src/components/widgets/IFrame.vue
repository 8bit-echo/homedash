<template>
  <div class="iframe">
    <iframe :src="url" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const url = computed(() => route.params.url as string);

</script>

<style>
.iframe {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 55px;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
