<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
//导入offersAPI
import { getOffersAPI } from "@/API/Modules/offers";
import { getImagePath } from "@/utils/Import";
//导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
const OffersMainAnimationRef = ref();
const OffersLi = ref<HTMLElement[]>([]);
const OffersMainAnimation = () => {
  OffersLi.value.forEach(async (item, index) => {
    // 先隐藏所有元素
    gsap.set(item, { autoAlpha: 0, y: 100 });
    // 为每个元素创建独立的 ScrollTrigger
    await ScrollTrigger.create({
      trigger: OffersMainAnimationRef.value,
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
};

const OffersData = ref<any[]>([]);
onMounted(async () => {
  const {
    data: { data },
  } = await getOffersAPI();
  OffersData.value = data;
  nextTick(() => {
    OffersMainAnimation();
  });
});
</script>
<template>
  <div class="Offers">
    <div class="header">
      <div class="h1">Which is Your Love</div>
      <div class="h2">Choice</div>
      <div class="h3">Something</div>
    </div>
    <div class="main" ref="OffersMainAnimationRef">
      <ul>
        <li
          v-for="(value, index) in OffersData"
          :key="index"
          :style="{ background: getRandomColor() }"
          :ref="(el)=>OffersLi.push(el as HTMLLIElement)"
        >
          <div class="hide" @click="router.push(`/buy/${value.goods_id}`)">
            Redeem Now
          </div>
          <div class="main">
            <div class="pic">
              <img :src="getImagePath(value.img_url)" alt="" />
            </div>

            <div class="content" style="z-index: 100">
              <div class="header">
                <div class="left">Valid Until 12/31</div>
                <v-icon class="iconfont icon-erweima"></v-icon>
              </div>
              <div class="main">
                <div class="top">{{ value.goods_name }}</div>
                <div class="bottom">
                  {{ value.goods_desc }}
                </div>
              </div>
              <div class="footer">
                <div class="left">
                  <div class="top">Code</div>
                  <div class="bottom">calorie:{{ value.calorie }}</div>
                </div>
                <div class="right">{{ value.category }}</div>
              </div>
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
          z-index: 999;
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
          & .pic {
            width: 100%;
            z-index: 10;
            height: 100%;
            position: absolute;
            overflow: hidden;
            & img {
              height: 100%;
              position: absolute;
              top: 45%;
              right: 0px;
              transform: translateY(-50%);
            }
          }
          & .content {
            flex: 1;
            display: flex;
            flex-direction: column;
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
}
</style>
