<template>
  <div class="digitalClock">
    <h1 class="time">
      <span class="hour">{{ hours }}</span>
      <span class="separator">:</span>
      <span class="mins">{{ mins }}</span>
    </h1>
    <p class="date">
      {{ date }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const time = ref(new Date());

setInterval(() => {
  time.value = new Date();
}, 1000);

const hours = computed(() => {
  return time.value.getHours().toString().padStart(2, '0');
});

const mins = computed(() => {
  return time.value.getMinutes().toString().padStart(2, '0');
});

const weekday = computed(() => {
  const day = time.value.getDay();
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
});

const date = computed(() => {
  const day = time.value.getDate();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.value.getMonth()];

  return `${weekday.value}, ${month.toString().padStart(2, '0')} ${day.toString().padStart(2, '0')} `;
});
</script>

<style>
.digitalClock {
  position: absolute;
  right: 20px;
  top: 20px;
}

.time {
  font-size: 5rem;
  margin: 0;
}

.hour {
  font-weight: 900;
}

.separator {
  font-weight: 300;
}

.mins {
  font-weight: 300;
  color: #aaa;
}

.date {
  font-size: 1rem;
  margin: 0;
}
</style>
