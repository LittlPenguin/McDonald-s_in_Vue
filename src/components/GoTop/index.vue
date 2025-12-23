<script setup lang="ts"></script>
<template>
  <div class="go-top">
    <v-icon
      style="transform: rotate(90deg)"
      class="iconfont icon-cc-arrow-left"
    ></v-icon>
  </div>
</template>
<style lang="scss" scoped>
.go-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #ffc500;
  border-radius: 50%;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
  }
}
</style>
