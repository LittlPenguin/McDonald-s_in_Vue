<script setup lang="ts">
import { ref, onMounted } from "vue";
//导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const OffersLi = ref<HTMLElement[]>([]);

// 随机颜色
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `linear-gradient(to bottom, ${color}, #000000b4)`;
};

// 动画区域
const OffersMainAnimation = ref();
onMounted(() => {
  OffersLi.value.forEach(async (item, index) => {
    // 先隐藏所有元素
    gsap.set(item, { autoAlpha: 0, y: 100 });
    // 为每个元素创建独立的 ScrollTrigger
    await ScrollTrigger.create({
      trigger: OffersMainAnimation.value,
      once: true,
      onEnter: () => {
        // 当元素进入视口时，延时执行动画
        gsap.to(item, {
          ease: "back.inOut(1.7)",
          autoAlpha: 1,
          duration: 1,
          y: 0,
          delay: index * 0.2,
        });
      },
    });
  });
});
</script>
<template>
  <div class="Offers">
    <div class="header">
      <div class="h1">Limited Time Access</div>
      <div class="h2">Exclusive</div>
      <div class="h3">Bundles</div>
    </div>
    <div class="main" ref="OffersMainAnimation">
      <ul>
        <li
          v-for="(value, index) in 4"
          :key="index"
          :style="{ background: getRandomColor() }"
          :ref="(el)=>OffersLi.push(el as HTMLLIElement)"
        >
          <div class="hide">Redeem Now</div>
          <div class="main">
            <div class="header">
              <div class="left">Valid Until 12/31</div>
              <v-icon class="iconfont icon-erweima"></v-icon>
            </div>
            <div class="main">
              <div class="top">Midnight Run</div>
              <div class="bottom">
                2 Big Macs + 2 Medium Fries. Available 10PM - 4AM.
              </div>
            </div>
            <div class="footer">
              <div class="left">
                <div class="top">Code</div>
                <div class="bottom">MIDNIGHT24</div>
              </div>
              <div class="right">40% OFF</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Offers {
  margin: 120px 0 100px 0;
  & > .header {
    font-family: "微软雅黑";
    line-height: 1;
    padding-left: 40px;
    font-weight: bolder;
    padding-bottom: 20px;
    border-bottom: 1px solid #2a2a2a;
    &::selection {
      background-color: #ffc500;
      color: #000;
    }
    & .h1 {
      color: #ffc500;
      font-size: 20px;
      letter-spacing: -2px;
    }
    & .h2 {
      font-size: 86px;
    }
    & .h3 {
      font-size: 80px;
      letter-spacing: -2px;
      -webkit-text-stroke: 1px white;
      color: transparent;
    }
  }
  & > .main {
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    & > ul {
      width: 75%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      & > li {
        border-radius: 15px;
        cursor: pointer;
        margin: 10px 5px;
        width: 35vw;
        height: 300px;
        position: relative;
        & > .hide {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #00000000;
          transition: all 0.3s ease;
          z-index: 99;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          color: transparent;
          position: absolute;
        }
        &:hover {
          & > .hide {
            color: #fff;
            background-color: #000000b4;
          }
        }
        & > .main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          flex: 1;
          & .header {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            font-size: 24px;
            & > .left {
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: 1;
              padding: 3px 25px;
              background-color: #290200;
              border-radius: 10086px;
            }
          }
          & > .main {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            flex: 3;
            padding-bottom: 20px;
            margin: 20px 20px 0 20px;
            border-bottom: 1px solid #505050;
            & .top {
              font-size: 30px;
              font-family: "微软雅黑";
              font-weight: bolder;
              letter-spacing: -2px;
            }
          }
          & > .footer {
            flex: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 10px 10px;
            & .left {
              line-height: 1.5;
              & .top {
                font-size: 20px;
                font-family: "微软雅黑";
                font-weight: bolder;
                color: #ada694;
                letter-spacing: -2px;
              }
            }
            & .right {
              font-size: 30px;
              font-family: "微软雅黑";
              font-weight: bolder;
              color: #fff;
              letter-spacing: -2px;
            }
          }
        }
      }
    }
  }
}
</style>
