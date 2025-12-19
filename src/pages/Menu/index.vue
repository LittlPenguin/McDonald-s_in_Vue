<script setup lang="ts">
import { ref } from "vue";

import byorder from "@/assets/Images/byorder.jpg";

// 选择分类小类
const listMaps = ref(["汉堡", "小食", "甜品", "饮品", "早餐"]);
const selectCategoryRefs = ref<any[]>([]);
const selectCategry = (index: number) => {
  selectCategoryAllRefs.value?.classList.remove("active");
  selectCategoryRefs.value.forEach((item, ind) => {
    item.classList.remove("active");
    if (ind === index) {
      item.classList.add("active");
    }
  });
};
// 选择分类大类
const selectCategoryAllRefs = ref<HTMLLIElement>();
const selectCategoryAll = () => {
  selectCategoryRefs.value.forEach((item) => {
    item.classList.remove("active");
  });
  selectCategoryAllRefs.value?.classList.add("active");
};
</script>
<template>
  <div class="Menu">
    <div class="header">
      <span class="bac">THE MENU</span>
      <ul>
        <li
          class="active"
          @click="selectCategoryAll()"
          ref="selectCategoryAllRefs"
        >
          所有
        </li>
        <li
          :ref="(el:any)=>selectCategoryRefs.push(el)"
          v-for="(val, ind) in listMaps"
          :key="ind"
          @click="selectCategry(ind)"
        >
          {{ val }}
        </li>
      </ul>
    </div>
    <div class="main">
      <ul>
        <li v-for="value in 10">
          <div class="pic">
            <img :src="byorder" alt="" />
          </div>
          <div class="title">Big Mac</div>
          <div class="price">
            <div class="left">550 KCAL</div>
            <div class="middle"></div>
            <div class="right">$5.99</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Menu {
  margin-top: 130px;
  & .header {
    width: 100%;
    height: 14vw;
    position: relative;
    user-select: none;
    & .bac {
      font-family: "微软雅黑";
      font-size: 12vw;
      color: #1e1e1e;
      text-transform: uppercase;
      top: 0;
      line-height: 1.3;
      left: 20px;
      font-weight: 800;
      position: absolute;
      z-index: 9;
    }
    & ul {
      display: flex;
      left: 20px;
      position: absolute;
      bottom: 20px;
      & li {
        padding: 5px 30px;
        z-index: 99;
        margin: 0 10px;
        cursor: pointer;
        border-radius: 100px;
        color: #98a3b5;
        font-size: 22px;
        border: 2px solid #575757;
        transition: all 0.3s ease;
        &:hover {
          border-color: #fff;
          color: #fff;
        }
        &.active {
          color: #000000;
          background-color: #ffc500;
          box-shadow: 0 0 10px -3px #ffc500;
          &:hover {
            border: 2px solid #575757;
          }
        }
      }
    }
  }
  & .main {
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    & ul {
      width: 97%;
      display: flex;
      justify-content: flex-start;
      gap: 2.5vw;
      flex-wrap: wrap;
      & li {
        margin: 20px 0;
        width: 22vw;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        height: 30vw;
        flex-direction: column;
        display: flex;
        &:hover .pic img {
          transform: scale(1.1) rotate(5deg);
        }
        & .pic {
          width: 100%;
          flex: 9;
          border-radius: 15px;
          overflow: hidden;
          & img {
            transition: all 0.3s ease;
            width: 100%;
            height: 100%;
          }
        }
        & .title {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26px;
          font-family: "微软雅黑";
          font-weight: 800;
          flex: 1;
        }
        & .price {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          font-size: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          & .left {
            color: #687287;
          }
          & .middle {
            margin: 0 10px;
            font-size: 0px;
            border: 5px solid #687287;
            border-radius: 999%;
          }
          & .right {
            font-family: "微软雅黑";
            font-weight: 800;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
