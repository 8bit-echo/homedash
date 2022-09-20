<template>
  <div ref="tickElement" class="tick" :data-value="targetValue">
    <span data-repeat="true">
      <span data-view="flip"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
const props = defineProps<{
  targetValue: string;
}>();
const chars = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '!',
  '?',
  '@',
  '#',
  '$',
  '&',
  '(',
  ')',
  '-',
  '+',
  '=',
  ':',
  ';',
  "'",
  '"',
  '.',
  ',',
  '°',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ' ',
];
const _tick = ref<string | null>(null);
const tickElement = ref<HTMLElement>();
const targetValue = computed(() => props.targetValue);

// watch(targetValue, (current, old) => {
//   flip();
// });

// watch(currentValue, (current, old) => {
//   flip();
// });

// Removed for performance reasons
// const flip = () => {
//   if (currentValue.value !== targetValue.value) {
//     setTimeout(() => {
//       const i = chars.indexOf(currentValue.value) + 1;
//       currentValue.value = chars[i % chars.length];
//     }, 60);
//   }
// };

onMounted(() => {
  _tick.value = Tick.DOM.create(tickElement.value, {
    value: targetValue.value,
  });
});

onBeforeUnmount(() => {
  Tick.DOM.destroy(tickElement);
});
</script>

<style>
.tick {
  font-size: 2rem;
  font-family: 'Monaco', monospace;
  position: relative;
}
</style>
