<template>
  <div class="settings">
    <h1>Settings</h1>
    <div>
      <TouchInput :value="hueIP" label="Hue Bridge IP Address" @change="onHueIPChange" key="1" />
      <TouchInput :value="plexIP" label="Plex Media Server IP Address" @change="onPlexIPChange" key="2" />

      <h2>Webpages</h2>
      <TouchInput :value="newWebpage" label="Add New Page" @change="onNewWebpageChange" key="3" />
      <button @click="onClickSaveNewPage()">Add</button>
      <ul>
        <li v-for="page in webPages" :key="page">
          <span>{{ page }}</span>
        </li>
      </ul>
    </div>
    <button id="save" @click="onSaveClick()">Save</button>
  </div>
</template>

<script async setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../hooks/useStore';
import TouchInput from '../components/TouchInput.vue';
import useTouchInput from '../hooks/useTouchInput';
import 'simple-keyboard/build/css/index.css';

const store = useStore();
const storedHueIP = computed(() => store.state.hue?.ipAddress ?? '');
const storedPlexIP = computed(() => store.state.plex?.ipAddress ?? '');
const webPages = computed<string[]>(() => store.state.webpages?.pages ?? []);

const [hueIP, onHueIPChange] = useTouchInput(storedHueIP.value);
const [plexIP, onPlexIPChange] = useTouchInput(storedPlexIP.value);
const [newWebpage, onNewWebpageChange] = useTouchInput('');

const onClickSaveNewPage = () => {
  store.commit('webpages/addPage', newWebpage.value);
  newWebpage.value = '';
};

const onSaveClick = () => {
  store.commit('hue/setIpAddress', hueIP.value);
  store.commit('plex/setIpAddress', plexIP.value);
};
</script>

<style scoped>
.settings {
  width: 50%;
  margin: 0 auto;
}
#save {
  margin: 10px;
  background: rgb(58, 133, 158);
  position: absolute;
  top: 1rem;
  right: 1rem;
}

ul {
  text-align: left;
}
</style>
