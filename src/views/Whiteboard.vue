<template>
  <vue-whiteboard
    class="whiteboard"
    :color="color"
    :line-styles="{
      'mix-blend-mode': 'normal',
    }"
    ref="whiteboard"
    :size="color === '#ffffff' ? '40' : '10'"
  />
  <div class="pallet">
    <div :class="['box', 'white', color === '#ffffff' ? 'selected' : '']" @click="color = '#ffffff'"></div>
    <div :class="['box', 'yellow', color === '#ffc93b' ? 'selected' : '']" @click="color = '#ffc93b'"></div>
    <div :class="['box', 'red', color === '#ff555f' ? 'selected' : '']" @click="color = '#ff555f'"></div>
    <div :class="['box', 'black', color === '#212121' ? 'selected' : '']" @click="color = '#212121'"></div>
    <div :class="['box', 'blue', color === '#3494ff' ? 'selected' : '']" @click="color = '#3494ff'"></div>
    <button @click="$refs.whiteboard.clear">Clear</button>
    <button class="specialChar" @click="$refs.whiteboard.undo"><span>↩</span></button>
    <button class="specialChar" @click="$refs.whiteboard.redo"><span>↪</span></button>
  </div>
</template>

<script>
import VueWhiteboard from '../components/widgets/VueWhiteboard.vue';

export default {
  name: 'App',
  components: {
    VueWhiteboard,
  },
  data: () => ({
    color: '#212121',
    image: null,
  }),
  methods: {
    async save() {
      const res = await this.$refs.whiteboard.save();
      this.image = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.whiteboard {
  display: block;
  margin: 0;
  width: 100vw;
  height: calc(100vh - 30px);
}
.pallet {
  position: absolute;
  display: flex;
  bottom: 100px;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  align-items: center;

  & button:not(:last-child) {
    margin-right: 10px;
  }
}

.box {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin: 0 10px;
  border: solid 4px transparent;
}
.black {
  background: #212121;
}
.yellow {
  background: #ffc93b;
}
.blue {
  background: #3494ff;
}
.red {
  background: #ff555f;
}

.white {
  background: #ffffff;
  border: solid 4px lightgrey;
}
.selected {
  border: solid 4px rgb(61, 172, 210);
}

button.specialChar {
  line-height: 1;

  > span {
    margin-top: 5px;
    position: relative;
    display: inline-block;
  }
}
</style>
