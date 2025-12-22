<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// 左侧数字索引
const liIndexLeft = (index: number) => {
  return index >= 10 ? index : "0" + index;
};

// 列表项动画引用
const TrendingLiAniMationRefs = ref<HTMLElement[]>([]);
onMounted(() => {
  TrendingLiAniMationRefs.value.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
      x: -100,
      autoAlpha: 0,
      duration: 0.5,
      ease: "back.inOut(1.7)",
    });
  });
});
</script>
<template>
  <div class="Trending">
    <div class="header">
      <div class="left">
        <div class="one">
          <h1>The</h1>
          <span>Hype</span>
        </div>
        <h2>List</h2>
      </div>
      <div class="right">
        Most ordered items across the globe in the last 24 hours.
      </div>
    </div>
    <div class="main">
      <ul>
        <li
          v-for="(value, index) in 10"
          :ref="(el) => TrendingLiAniMationRefs.push(el as HTMLElement)"
        >
          <div class="left">{{ liIndexLeft(index + 1) }}</div>
          <div class="middle">
            <img src="" alt="" />
          </div>
          <div class="right">
            <div class="header">
              <div class="left">Trending</div>
              <div class="right">Burgers</div>
            </div>
            <div class="title">Quarter Pounder</div>
            <div class="des">
              A quarter pound of 100% fresh beef that’s hot, deliciously juicy
              and cooked when you order.
            </div>
            <div class="footer">
              <div class="pric">$6.49</div>
              <div class="detail">View Details</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Trending {
  margin-top: 120px;
  & > .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 40px;
    line-height: 1;
    &::selection {
      background-color: #ffc500;
      color: #000;
    }
    & .left {
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-weight: bolder;

      & .one {
        display: flex;
        justify-content: center;
        align-items: center;
        & h1 {
          font-size: 120px;
          text-transform: uppercase;
        }
        & span {
          color: #ffc500;
          padding-left: 5px;
          font-family: "微软雅黑";
          text-transform: uppercase;
          font-size: 120px;
        }
      }
      & h2 {
        padding-left: 30px;
        font-size: 120px;
        text-transform: uppercase;
      }
    }
    & .right {
      padding-bottom: 10px;
      font-size: 24px;
      width: 270px;
      color: #99a4b6;
      text-align: end;
    }
  }
  & > .main {
    & ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &::selection {
        background-color: #ffa900;
        color: #000;
      }
      & li {
        &:nth-last-child(1) {
          border-bottom: 0;
          margin-bottom: 0;
        }
        width: 95%;
        height: 32vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        border-bottom: 1px solid #3a3a3a;
        & > .left {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 7vw;
          line-height: 1;
          color: #121212;
          user-select: none;
        }
        & > .middle {
          flex: 3;
          height: 80%;
          border-radius: 20px;
          background-color: palegoldenrod;
        }
        & > .right {
          padding-left: 20px;
          flex: 5;
          & .header {
            display: flex;
            font-family: "微软雅黑";
            align-items: center;
            font-weight: bolder;
            text-transform: uppercase;
            & .left {
              background-color: #ff1102;
              color: #fff;
              font-size: 1.5vw;
              padding: 5px;
            }
            & .right {
              font-size: 1vw;
              margin-left: 20px;
              color: #687287;
            }
          }
          & .title {
            text-transform: uppercase;
            font-size: 3vw;
            font-family: "微软雅黑";
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            &:hover {
              color: #ffc500;
            }
          }
          & .des {
            width: 60%;
            font-family: "微软雅黑";
            font-size: 1.1vw;
            color: #9aa49e;
          }
          & .footer {
            margin-top: 15px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 2vw;
            & .pric {
              font-size: 2.5vw;
            }
            & .detail {
              padding: 3px 20px;
              border: 1px solid #ccc;
              font-family: "微软雅黑";
              text-transform: uppercase;
              font-size: 1.2vw;
              border-radius: 9999px;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              &:hover {
                color: #000;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
