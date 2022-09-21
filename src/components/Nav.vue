<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/"><CIcon :icon="cilHome" /></RouterLink>
      </li>

      <li v-for="page in webpages" :key="page">
        <RouterLink :to="`/iframe/${encodeURIComponent(page ?? 'null')}`">
          <Component :is="getIcon(page)" />
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/whiteboard"><CIcon :icon="cilPen" /></RouterLink>
      </li>

      <li>
        <RouterLink to="/now-playing"><Plex /></RouterLink>
      </li>

      <li>
        <RouterLink to="/settings"><CIcon :icon="cilSettings" /></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { CIcon } from '@coreui/icons-vue';
import { cilHome, cilSettings, cilPen } from '@coreui/icons';
import { useStore } from '../hooks/useStore';
import Sonarr from '../assets/sonarr.svg';
import Radarr from '../assets/radarr.svg';
import Plex from '../assets/plex.svg';
import { computed } from 'vue';
const store = useStore();

const webpages = computed(() => store.state.webpages?.pages);

const getIcon = (page: string) => {
  if (page.includes(':8989')) {
    return Sonarr;
  }

  if (page.includes(':7878')) {
    return Radarr;
  }

  return '?';
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
}

li {
  margin: none;
}
a {
  display: inline-block;
  width: 50px;
  height: 50px;
  color: #838383;
  padding: 1rem;
}

.router-link-exact-active {
  color: #fff;
}
nav {
  background: black;
  color: #838383;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>
