<script setup lang="ts">
import AniMationText from "@/components/AnimationText/index.vue";
import pgscscnb from "@/assets/images/培根蔬萃双层牛堡.png";
import shutiao from "@/assets/images/薯条.png";
import coke from "@/assets/images/可乐.png";
import cofe1 from "@/assets/images/cofe1.jpg";

import { onMounted, ref } from "vue";

// 路由跳转
import { useRouter } from "vue-router";
const router = useRouter();

//导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);

const LayoutMainSplit = ref(null);
const t1 = ref<HTMLElement[]>([]);
const introduce = ref(null);
const whatHot = ref<HTMLElement[]>([]);
onMounted(() => {
  // 布局主模块的标题文本
  gsap.from(SplitText.create(LayoutMainSplit.value, { type: "chars" }).chars, {
    duration: 1.2,
    y: 150, //偏移量
    autoAlpha: 0, // 从透明度0开始显示
    stagger: 0.1, // 每个字符之间的延迟时间
  });
  //时间线处理首页的标题文本和按钮动画
  const timeLine = gsap.timeline();
  t1.value.forEach((el) => {
    timeLine.from(el, { autoAlpha: 0, duration: 1, y: 20 }, "<.7");
  });
  //introduce动画
  gsap.to(introduce.value, {
    scrollTrigger: {
      trigger: introduce.value,
      start: "top center+=200",
    },
    duration: 1.5,
    opacity: 1,
  });
  //whatHot
  const whatHotTimeLine = gsap.timeline();
  whatHot.value.forEach((el) => {
    whatHotTimeLine.from(
      SplitText.create(el, { type: "chars" }).chars,
      {
        scrollTrigger: {
          trigger: ".whatHot",
          start: "top center+=200",
          end: "top center",
          scrub: 1,
        },
        duration: 0.5,
        y: 150, //偏移量
        autoAlpha: 0, // 从透明度0开始显示
        stagger: 0.05, // 每个字符之间的延迟时间
      },
      0.5
    );
  });
});
</script>
<template>
  <div class="LayoutMain" style="margin-top: 150px">
    <div class="banner">
      <div class="title" ref="LayoutMainSplit">
        <span class="left">BIG</span>
        <span class="right">MAG </span>
      </div>
      <span class="subtitle" :ref="(el:any) => t1.push(el)"
        >The Original. Since 1968.</span
      >
      <div class="goMenu" :ref="(el:any) => t1.push(el)">
        <v-btn class="goMenuBtn" @click="router.push('/menu')">
          Start order
        </v-btn>
      </div>
    </div>
    <AniMationText text="FRESH • HOT • CRISPY • JUICY" />
    <div class="introduce" ref="introduce" style="opacity: 0">
      <div class="left" @click="router.push('/menu')">
        <img :src="pgscscnb" alt="" />
        <div class="card">
          <span class="title">Category 01</span>
          <span class="subTitle">Burgers</span>
          <span class="smallSubTitle">perfect foods</span>
        </div>
      </div>
      <div class="right">
        <div class="top" @click="router.push('/menu')">
          <img :src="shutiao" class="rightImg" alt="" />
          <div class="card">
            <span class="title">Category 02</span>
            <span class="subTitle">chips</span>
            <span class="smallSubTitle">perfect foods</span>
          </div>
        </div>
        <div class="bottom" @click="router.push('/menu')">
          <img :src="coke" class="rightImg" alt="" />
          <div class="card">
            <span class="title">Category 03</span>
            <span class="subTitle">coke</span>
            <span class="smallSubTitle">perfect foods</span>
          </div>
        </div>
      </div>
    </div>
    <div class="whatHot">
      <div class="title">
        <div class="left">
          <div class="title" :ref="(el:any)=>whatHot.push(el)">
            What's Hot Now
          </div>
          <div class="subTitle" :ref="(el:any)=>whatHot.push(el)">Trending</div>
          <div class="subTitleT" :ref="(el:any)=>whatHot.push(el)">Drops</div>
        </div>
        <div class="right" @click="router.push('/trending')">
          <span> Explore All </span>
          <v-icon
            size="x-small"
            class="iconfont icon-cc-arrow-right whatHotIcon-cc-arrow-right"
          ></v-icon>
        </div>
      </div>
      <div class="main">
        <ul>
          <li v-for="value in 3">
            <div class="pic">
              <img :src="cofe1" alt="" />
            </div>
            <div class="title">Big Mac</div>
            <div class="subTitle">
              <span class="left">550 KCAL</span>
              <span class="middle"></span>
              <span class="right">$5.99</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <AniMationText
      text="FRESH • HOT • CRISPY • JUICY"
      style="margin-bottom: 0"
    />
  </div>
</template>

<style lang="scss" scoped>
.LayoutMain {
  & .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    & .title {
      text-transform: uppercase;
      font-size: 17vw;
      letter-spacing: -2vw;
      user-select: none;

      & .left {
        font-weight: 800;
        letter-spacing: -4vw;
        margin-right: 50px;
      }
      & .right {
        -webkit-text-stroke: 6px rgb(51, 51, 51);
        color: transparent;
      }
    }
    & .subtitle {
      font-size: 24px;
      color: #687287;
      text-transform: uppercase;
      &::selection {
        color: #000000;
        background-color: #ffc500;
      }
    }
    & .goMenu {
      & .goMenuBtn {
        margin-top: 50px;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 800;
        padding: 30px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.1) translateY(-5px);
        }
      }
    }
  }
  & .introduce {
    display: flex;
    height: 43vw;
    margin: 0 100px;
    gap: 50px;
    & .card {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      width: 100%;
      height: 50%;
      padding-bottom: 20px;
      padding-left: 10px;
      z-index: 9;
      & .title {
        font-size: 20px;
        color: #a53603;
        letter-spacing: 2px;
      }
      & .subTitle {
        color: #fff;
        font-size: 54px;
        line-height: 1;
      }
      & .smallSubTitle {
        opacity: 0;
        transition: all 0.5s ease;
        color: #9198ac;
      }
    }
    & span {
      text-transform: uppercase;
      font-weight: 800;
      text-transform: uppercase;
    }

    & .left,
    & .right {
      border-radius: 10px;
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
    & .left:hover .smallSubTitle {
      opacity: 1;
      transform: translateY(-3px);
    }
    & .right {
      justify-content: center;
      align-items: center;
      gap: 30px;
      flex-direction: column;
      & .top,
      & .bottom {
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: flex-start;
        border-radius: 10px;
        align-items: flex-end;
        &:hover .smallSubTitle {
          opacity: 1;
          transform: translateY(-3px);
        }
      }
    }
    & .left,
    & .top,
    & .bottom {
      background-color: #21242f;
      position: relative;
      overflow: hidden;
      background-image: url("../../../assets/Images/ban.jpg");
      background-position-x: 30%;
      background-size: cover;
      cursor: pointer;
      &:hover img {
        transform: scale(1.45);
        filter: grayscale(0%);
      }
      & img {
        position: absolute;
        height: 100%;
        top: 24px;
        left: -20px;
        transform: scale(1.35);
        transition: all 0.3s ease;
        filter: grayscale(100%);
      }
      & .rightImg {
        left: 38%;
      }
    }
  }
  & .whatHot {
    width: 80%;
    margin: 0 auto;
    margin-top: 300px;
    & .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      &::selection {
        color: #000000;
        background-color: #ffc500;
      }
      & .left {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        & .title {
          font-size: 26px;
          color: #ffc500;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before {
            content: "";
            width: 40px;
            margin-right: 10px;
            height: 3px;
            background-color: #ffc500;
          }
        }
        & .subTitle {
          color: #fff;
          line-height: 1;
          font-family: "微软雅黑";
          font-weight: 800;
          font-size: 94px;
          letter-spacing: -3px;
        }
        & .subTitleT {
          line-height: 1;
          font-size: 94px;
          -webkit-text-stroke: 2px #fefefe;
          color: transparent;
          font-family: "微软雅黑";
          font-weight: 800;
        }
      }
      & .right {
        font-size: 20px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0 10px;
        &:hover {
          color: #ffc500;
        }
        &:hover .whatHotIcon-cc-arrow-right {
          right: -10px;
        }
        & .whatHotIcon-cc-arrow-right {
          position: relative;
          right: 0;
          transition: all 0.3s ease;
          margin-left: 20px;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          height: 1px;
          background-color: #1e1e1e;
        }
      }
    }
    & .main {
      margin-top: 80px;
      & ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        & li {
          margin: 0 1.5vw;
          height: 35vw;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          &::selection {
            color: #000000;
            background-color: #ffc500;
          }
          & .pic {
            width: 23vw;
            height: 80%;
            border-radius: 15px;
            overflow: hidden;
            & img {
              width: 120%;
              height: 100%;
              transition: all 0.3s ease;
            }

            @media screen and (max-width: 1030px) {
              & {
                width: 35vw;
              }
            }
            @media screen and (max-width: 770px) {
              & {
                width: 95vw;
              }
            }
          }
          &:hover .pic img {
            transform: rotate(3deg) scale(1.1);
          }
          & .title {
            text-transform: uppercase;
            font-size: 23px;
            letter-spacing: -1px;
            font-family: "微软雅黑";
            font-weight: 800;
            margin-top: 20px;
            transition: all 0.3s ease;
          }
          & .subTitle {
            display: flex;
            align-items: center;
            & .left {
              color: #687287;
              font-size: 18px;
            }
            & .middle {
              font-size: 0px;
              border-radius: 100%;
              border: 4px solid #687287;
              margin: auto 10px;
            }
            & .right {
              font-size: 18px;
            }
          }
          @media screen and (max-width: 1030px) {
            & {
              height: 45vw;
            }
          }
          @media screen and (max-width: 770px) {
            & {
              height: 65vw;
            }
          }
          &:hover .title {
            color: #ffc500;
          }
        }
      }
    }
  }
}
</style>
