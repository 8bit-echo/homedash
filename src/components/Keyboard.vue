<template>
  <div class="on-screen-keyboard" :class="{ show: showKeyboard }">
    <div class="hg-theme-default hg-layout-default" :class="uuid" />
  </div>
</template>

<script setup lang="ts">
import Keyboard from 'simple-keyboard';

import { onMounted, watch, computed, ref, onBeforeMount } from 'vue';

const emit = defineEmits<{
  (event: 'change', input: string): void;
  (event: 'keyPress', button: string): void;
  (event: 'show', show: boolean): void;
}>();

const props = defineProps<{
  input: string;
  show: boolean;
  layout: 'default' | 'shift';
}>();
const input = computed(() => props.input);
const showKeyboard = computed(() => props.show);
const activeLayout = computed(() => props.layout);
const keyboard = ref<Keyboard | null>(null);

  const layout = {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{lock} a s d f g h j k l : \' {enter}',
      '{shift} z x c v b n m , . / {shift}',
      '.com {space} .local',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L ; " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '.com {space} .local',
    ],
  };

//random css classname
const uuid = ref(Math.random().toString(36).substring(7).replace(/[0-9]/g, ''));

onMounted(() => {
  keyboard.value = new Keyboard(uuid.value, {
    display: {
      '{enter}': 'enter ↵',
      '{bksp}': '⌫',
      '{shift}': '⇧',
      '{lock}': '⇪',
      '{tab}': '⇥',
      '{space}': ' ',
    },
    layout,
    onChange,
    onKeyPress,
    preventMouseDownDefault: true,
    preventMouseUpDefault: true,
  });

  keyboard.value.setInput(input.value);
});

onBeforeMount(() => {
  keyboard.value?.destroy();
});

watch(input, (newInput) => {
  if (keyboard.value) {
    keyboard.value.setInput(newInput);
  }
});

const onChange = (input: string) => {
  emit('change', input);
};

const onKeyPress = (button: string) => {
  emit('keyPress', button);
};

watch(activeLayout, (newLayout) => {
  if (keyboard.value) {
    handleShift(newLayout);
  }
});

const handleShift = (newLayout: 'default' | 'shift') => {
  keyboard.value?.setOptions({
    layoutName: newLayout,
  });
};
</script>

<style lang="scss">
.on-screen-keyboard {
  bottom: -335px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 66%;
  height: 335px;
  transition: bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  & > div {
    background-color: #111;
    color: #cdf7ff;
    font-family: inherit;
    padding: 10px;
    right: 0;
    text-shadow: 0 0 20px #19ddff;

    .hg-button {
      background: #333;
      border-bottom: 1px solid #6c6c6c;
      height: 60px;

      &.hg-activeButton {
        background: #222;
      }

      &.hg-button-space {
        width: 75%;
      }
    }
  }

  &.show {
    bottom: 0;
  }
}
</style>
