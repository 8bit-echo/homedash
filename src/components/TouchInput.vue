<template>
  <div class="touchInput">
    <label>
      <span>{{ label }}</span>
      <input type="text" :value="value" @focus="onShowHide(true)" @blur="onShowHide(false)" />
    </label>

    <Keyboard :input="value" @change="onKeyboardChange" @keyPress="onVirtualKeyPress" :show="showKeyboard" :layout="layout" :key="label" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Keyboard from './Keyboard.vue';
defineProps<{
  label: string;
  value: string;
}>();

const emit = defineEmits<{
  (event: 'change', value: string): void;
}>();

const showKeyboard = ref(false);
const layout = ref<'default' | 'shift'>('default');

const onShowHide = (show: boolean | null = null) => {
  if (show === null) {
    showKeyboard.value = !showKeyboard.value;
  } else {
    showKeyboard.value = show;
  }
};

const onKeyboardChange = (input: string) => {
  emit('change', input);
};

const onVirtualKeyPress = (key: string) => {
  if (key === '{enter}') {
    showKeyboard.value = false;
  }
  if (key === '{shift}' || key === '{lock}') {
    layout.value = layout.value === 'default' ? 'shift' : 'default';
  }
};
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  background: transparent;
  font-size: 1.25rem;
  font-weight: normal;
}

input:focus {
  border-color: var(--numberColor);
}
</style>
