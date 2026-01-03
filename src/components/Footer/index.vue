<script lang="ts" setup>
type SocialPlatform = "Instagram" | "Twitter" | "Facebook";
const HrefMaps: Record<SocialPlatform, string> = {
  Instagram: "https://www.instagram.com/mcdonalds/",
  Twitter: "https://twitter.com/mcdonalds",
  Facebook: "https://www.facebook.com/mcdonalds",
};
// 跳转
const goHref = (href: SocialPlatform) => {
  window.location.href = HrefMaps[href];
};
</script>
<template>
  <div class="footer">
    <div class="bac">Mdonalds</div>
    <div class="text">
      <ul>
        <li @click="goHref('Instagram')">Instagram</li>
        <li @click="goHref('Twitter')">Twitter</li>
        <li @click="goHref('Facebook')">Facebook</li>
      </ul>
      <span> © 2025 McDonald's Corporation. Designed for the Future.</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #1c1c1c;
  height: 400px;
  position: relative;
  padding-bottom: 100px;
  & .bac {
    top: 35%;
    transform: translate(-50%);
    left: 50%;
    position: absolute;
    color: #202020;
    letter-spacing: -20px;
    font-family: "微软雅黑";
    font-weight: 800;
    font-size: 16vw;
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-transform: uppercase;
    user-select: none;
    z-index: 99;
  }
  & .text {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & ul {
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      & li {
        margin: 0 10px;
        color: #687287;
        font-size: 28px;
        cursor: pointer;
        padding: 5px 10px;
        transition: all 0.3s ease;
        &:hover {
          color: #ffc500;
          transform: translateY(-5px);
        }
      }
    }
    & span {
      margin-top: 20px;
      font-size: 28px;
      z-index: 999;
      color: #364658;
        text-align: center;
    }
  }
}

@media screen and (max-width: 400px) {
  .footer {
    height: 350px;
    .text {
      ul {
        & li {
          font-size: 24px;
        }
      }
      & span {
        font-size: 20px;
      }
    }
  }
}
</style>
