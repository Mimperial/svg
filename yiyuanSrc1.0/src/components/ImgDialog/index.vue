<template>
  <div class="img-dialog" v-if="visible" @click="close">
    <div>
      <img :src="src" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "img-dialog",
  props: {
    src: "",
    visible: true
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss">
.img-dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  & > div {
    width: 1000px;
    height: 800px;
    max-width: 1000px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background: #ccc;
    img {
      width: 100%;
      max-width: 1000px;
      min-width: 600px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .close {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 30px;
      font-weight: 600;
      cursor: pointer;
      z-index: 9999;
      color: #fff;
    }
  }
}
</style>