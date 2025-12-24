<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { getImagePath } from "@/utils/Import";
import { useCarStore, useAccountStore } from "@/Store/index.ts";
const carStore = useCarStore();
const accountStore = useAccountStore();
// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 左侧数字索引
const liIndexLeft = (index: number) => {
  return index >= 10 ? index : "0" + index;
};
// 列表项动画引用
const TrendingLiAniMationRefs = ref<HTMLElement[]>([]);
const TotalOrder = ref();
onMounted(() => {
  nextTick(() => {
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
    gsap.from(TotalOrder.value, {
      x: 100,
      autoAlpha: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "back.inOut(1.7)",
    });
  });
});

// 获取数据
onMounted(async () => {
  await carStore.getCarList(accountStore.Email);
});

// 计算价格
const totalPrice = computed(() => {
  let total = 0;
  carStore.carList.forEach((item) => {
    total += item.price * item.buy_quantity;
  });
  return total;
});

// 交易提示
const snackbar = ref(false);
const snackbarText = ref("你好");
const snackbarColorMap = ["green-darken-4", "red-darken-4"];
const snackbarColor = ref(snackbarColorMap[0]);
// 购买
const orderPay = async () => {
  const { data: res } = await carStore.clearCar(accountStore.Email);
  if (res.code === 200) {
    snackbarColor.value = snackbarColorMap[0];
  } else {
    snackbarColor.value = snackbarColorMap[1];
  }
  snackbar.value = true;
  snackbarText.value = res.message;
};
</script>
<template>
  <div class="Trending" ref="CardOrder">
    <v-snackbar
      style="top: 100px"
      location="top"
      color="green-darken-4"
      variant="tonal"
      v-model="snackbar"
      timeout="1000"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="green-darken-4" variant="tonal" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
    <v-empty-state
      style="margin: 100px 0"
      v-if="!carStore.carList.length"
      text="这里好像没有你的订单数据喔"
      title="你下单了吗"
    ></v-empty-state>
    <div class="main">
      <ul>
        <li
          v-for="(value, index) in carStore.carList"
          :ref="(el) => TrendingLiAniMationRefs.push(el as HTMLElement)"
        >
          <div class="left">{{ liIndexLeft(index + 1) }}</div>
          <div class="middle">
            <img
              style="height: 100%"
              :src="getImagePath(value.img_url)"
              alt=""
            />
          </div>
          <div class="right">
            <div class="header">
              <div class="left">Trending</div>
              <div class="right">{{ value.category }}</div>
            </div>
            <div class="title">{{ value.goods_name }}</div>
            <div class="des">
              {{ value.goods_desc }}
            </div>
            <div class="footer">
              <div class="pric">${{ (value.price * value.buy_quantity).toFixed(2) }}</div>
              <div
                class="detail"
                @click="router.push(`/buy/${value.goods_id}`)"
              >
                View Details
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="order" ref="TotalOrder" v-if="carStore.carList.length">
        <div class="title">Summary</div>
        <div class="Subtotal">
          <div class="top">
            <span>Subtotal</span>
            <span>$ {{ totalPrice.toFixed(2)  }}</span>
          </div>
          <div class="bottom">
            <span>Tax (8%)</span>
            <span>${{ (totalPrice * 0.08).toFixed(2) }}</span>
          </div>
        </div>
        <div class="total">
          <span>Total</span>
          <span class="totalPrice"
            >${{ (totalPrice - totalPrice * 0.08).toFixed(2) }}</span
          >
        </div>
        <div class="checkout" @click="orderPay()">Checkout</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Trending {
  margin-top: 120px;
  position: relative;
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
    display: flex;
    & ul {
      flex: 1;
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
          background-color: #ffa900;
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
    & .order {
      margin-left: 30px;
      margin-top: 70px;
      background: linear-gradient(
        45deg,
        #ffc0001a 0%,
        #ffc0000d 30%,
        #ffc00000 70%,
        #7b100015 100%
      );
      margin-right: 120px;
      &::selection {
        background-color: #ffc500;
        color: #000;
      }
      width: 20vw;
      height: 25vw;
      background-color: #121212;
      padding: 10px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & .title {
        width: 100%;
        font-size: 22px;
        color: #fff;
        font-family: "微软雅黑";
        flex: 1;
        padding-left: 10px;
        display: flex;
        align-items: center;
        font-weight: bolder;
      }
      & .Subtotal {
        width: 100%;
        color: #c0c6cf;
        font-size: 18px;
        flex: 1;
        border-bottom: 1px solid #3a3a3a;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0 5px;
        & > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      & .total {
        width: 100%;
        font-size: 24px;
        flex: 1;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .totalPrice {
          color: #ffc500;
        }
      }
      & .checkout {
        flex: 1;
        width: 80%;
        background-color: #ffc500;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-weight: bolder;
        font-size: 26px;
        line-height: 1;
        cursor: pointer;
        font-family: "微软雅黑";
        border-radius: 15px;
        transition: all 0.3s ease-out;
        user-select: none;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
