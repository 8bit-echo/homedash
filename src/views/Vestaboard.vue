<template>
  <div class="vestaboard">
    <h2>Now Playing on Dicksflix</h2>
    <!-- <div class="row"><Flip v-for="(char, i) in row1Value.split('')" :key="`row1-${i}`" :targetValue="char" /></div> -->
    <div class="row"><Flip :targetValue="row1Value" /></div>
    <div class="row"><Flip :targetValue="row2Value" /></div>
    <div class="row"><Flip :targetValue="row3Value" /></div>
    <div class="row"><Flip :targetValue="row4Value" /></div>
    <div class="row"><Flip :targetValue="row5Value" /></div>
    <div class="row posters">
      <img v-for="poster in posters" :src="poster" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import Flip from '../Components/Flip.vue';
import { useStore } from '../hooks/useStore';
const NUMBER_OF_TILES = 32;

const row1Value = ref(Array(NUMBER_OF_TILES).fill(' ').join(''));
const row2Value = ref(Array(NUMBER_OF_TILES).fill(' ').join(''));
const row3Value = ref(Array(NUMBER_OF_TILES).fill(' ').join(''));
const row4Value = ref(Array(NUMBER_OF_TILES).fill(' ').join(''));
const row5Value = ref(Array(NUMBER_OF_TILES).fill(' ').join(''));
const posters = ref<string[]>([]);
const store = useStore();
const plexServer = computed(() => store.state.plex?.ipAddress);

const getRecent = async () => {
  if (plexServer.value) {
    const res = await fetch(
      `http://${
        plexServer.value
      }:32400/hubs/home/recentlyAdded?type=1&pinnedContentDirectoryID=4,5,9,11,playlists&contentDirectoryID=4&pinnedContentDirectoryID=4,5,9,11,playlists&includeCollections=1&includeExternalMedia=1&includeAdvanced=1&includeMeta=1&X-Plex-Product=Plex Web&X-Plex-Version=4.84.1&X-Plex-Client-Identifier=byt8akrwrrcogxgoswe50rtr&X-Plex-Platform=Chrome&X-Plex-Platform-Version=104.0&X-Plex-Features=external-media,indirect-media&X-Plex-Model=bundled&X-Plex-Device=OSX&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1512x869,1512x982&X-Plex-Container-Start=0&X-Plex-Container-Size=5&X-Plex-Token=${
        import.meta.env.VITE_PLEX_TOKEN
      }&X-Plex-Provider-Version=5.1&X-Plex-Text-Format=plain&X-Plex-Language=en`,
      { headers: { Accept: 'application/json' } }
    );
    const data = await res.json();
    const { MediaContainer } = data;
    const { Metadata } = MediaContainer;
    // get the first 4 items titles
    const titles = Metadata.map((item: any) => ({ title: item.title, year: item.year, thumb: item.thumb }));

    const rows = titles.map(({ title, year }: any) => {
      if (title.length + 7 <= NUMBER_OF_TILES) {
        return `${title} (${year})`.toUpperCase().padEnd(NUMBER_OF_TILES, ' ');
      }
      return title.toUpperCase().padEnd(NUMBER_OF_TILES, ' ');
    });

    // set thumbs
    posters.value = Metadata.map(
      ({ thumb }: any) =>
        `http://${plexServer.value}:32400/photo/:/transcode?width=240&height=400&url=${encodeURIComponent(thumb)}&X-Plex-Token=${
          import.meta.env.VITE_PLEX_TOKEN
        }`
    );

    // set the row values
    row1Value.value = rows[0];
    row2Value.value = rows[1];
    row3Value.value = rows[2];
    row4Value.value = rows[3];
    row5Value.value = rows[4];
  }
};

onMounted(() => {
  getRecent();
});
</script>

<style>
.vestaboard {
  padding: 1rem;
  background: #111;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.row {
  display: flex;
  margin: 10px 0;
}

.posters {
  width: 1280px;
  margin: 100px 0;
  justify-content: space-between;
}

.posters img {
  /* border: solid 20px rgb(116, 0, 23); */
}
</style>
