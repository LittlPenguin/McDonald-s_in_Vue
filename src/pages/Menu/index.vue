<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { getMenuAPI } from "@/API/Modules/menu.ts";
import { getImagePath } from "@/utils/Import.ts";
import type { MenuItemTypes } from "@/Types/Menu.d.ts";
//导入Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 选择分类小类
const MenuMainList = ref<MenuItemTypes[]>([]);
const listMaps = ref(["汉堡", "小食", "甜品", "饮品"]);
const selectCategoryRefs = ref<any[]>([]);
const selectCategry = (index: number) => {
  selectCategoryAllRefs.value?.classList.remove("active");
  selectCategoryRefs.value.forEach(async (item, ind) => {
    item.classList.remove("active");
    if (ind === index) {
      item.classList.add("active");

      const {
        data: { data },
      } = await getMenuAPI({ Category: listMaps.value[index] });
      MenuMainList.value = data;
    }
  });
};
// 选择分类大类
const selectCategoryAllRefs = ref<HTMLLIElement>();
const selectCategoryAll = async () => {
  selectCategoryRefs.value.forEach((item) => {
    item.classList.remove("active");
  });
  selectCategoryAllRefs.value?.classList.add("active");
  const {
    data: { data },
  } = await getMenuAPI({ Category: "所有" });
  MenuMainList.value = data;
};

onMounted(async () => {
  const {
    data: { data },
  } = await getMenuAPI({ Category: "所有" });
  MenuMainList.value = data;
});

// 动画区域
const MenuMainLiRefs = ref<HTMLElement[]>([]);
const lineItemCount = ref<number[]>([]);
const MenuAnimation = () => {
  let lineItemCountB = 0;
  let lineItemCountA = 0;
  MenuMainLiRefs.value.forEach((item, index) => {
    // 为每个元素单独创建 ScrollTrigger
    // 判断一行有多少个
    if (item) {
      if (lineItemCountA === item.offsetTop || lineItemCountA === 0) {
        lineItemCountB++;
        lineItemCountA = item.offsetTop;
      } else {
        lineItemCount.value.push(lineItemCountB);
        lineItemCountA = item.offsetTop;
        lineItemCountB = 0;
      }
      // 先隐藏所有元素
      gsap.set(item, { autoAlpha: 0, y: 100 });
      // 为每个元素创建独立的 ScrollTrigger
      ScrollTrigger.create({
        trigger: item,
        once: true,
        onEnter: () => {
          // 当元素进入视口时，延时执行动画
          gsap.to(item, {
            ease: "back.inOut(1.7)",
            autoAlpha: 1,
            duration: 1,
            y: 0,
            delay: lineItemCount.value[0]
              ? (index % lineItemCount.value[0]!) * 0.1
              : index * 0.1,
          });
        },
      });
    }
  });
};
watch(
  () => MenuMainList.value,
  () => {
    nextTick(() => {
      MenuAnimation();
    });
  },
  { deep: true }
);
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
          :ref="(el:any)=>selectCategoryRefs[ind]=el"
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
        <li
          style="cursor: pointer"
          v-for="(value, index) in MenuMainList"
          :key="value.goods_id"
          :ref="(el) => (MenuMainLiRefs[index] = el)"
          @click="router.push(`/buy/${value.goods_id}`)"
        >
          <div class="pic">
            <img :src="getImagePath(value.img_url)" alt="" />
          </div>
          <div class="title">{{ value.goods_name }}</div>
          <div class="price">
            <div class="left">{{ value.calorie }} KCAL</div>
            <div class="middle"></div>
            <div class="right">${{ value.price }}</div>
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
