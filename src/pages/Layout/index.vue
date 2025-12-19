<script setup lang="ts">
import HeaderCom from "@/components/Header/index.vue";
import FooterCom from '@/components/Footer/index.vue'
import { onMounted, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
// 导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const route = useRoute();
let ctx: any, smoother: any;

watch(route, (newVal) => {
  smoother && smoother.kill();
  smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
  });
});

onMounted(() => {
  ctx = gsap.context(() => {
    smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  });
});

onUnmounted(() => {
  ctx && ctx.revert();
});
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
