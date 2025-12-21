<script setup lang="ts">
import HeaderCom from "@/components/Header/index.vue";
import FooterCom from "@/components/Footer/index.vue";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
// 导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const route = useRoute();
const scroll = ref<ScrollSmoother>();
onMounted(() => {
  // create the scrollSmoother before your scrollTriggers
  scroll.value = ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
});

watch(
  () => route.path,
  (newval) => {
    scroll.value?.scrollTop(0);
  }
);
</script>
<template>
  <HeaderCom />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <RouterView />
      <FooterCom />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
