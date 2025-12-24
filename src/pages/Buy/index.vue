<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getGoodsDetailAPI } from "@/API/Modules/goods.ts";
import { getImagePath } from "@/utils/Import.ts";
// 路由
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// pinia
import { useCarStore, useAccountStore } from "@/Store/index.ts";
const carStore = useCarStore();
const accountStore = useAccountStore();

const snackbar = ref(false);
const snackbarText = ref("你好");
const snackbarColorMap = ["green-darken-4", "red-darken-4"];
const snackbarColor = ref(snackbarColorMap[0]);
// 获取商品参数
const goodsId = ref("");
// 获取商品详情
const goodsDetails = ref();
const getGoodsDetail = async () => {
  const {
    data: { data },
  } = await getGoodsDetailAPI({ goods_id: goodsId.value });
  goodsDetails.value = data;
};

// 添加购物车方法
const addCarsMethods = async () => {
  const res = await carStore.addCar(
    goodsDetails.value.goods_id,
    accountStore.Email
  );
  if (res.code === 200) {
    snackbarColor.value = snackbarColorMap[0];
  } else {
    snackbarColor.value = snackbarColorMap[1];
  }
  snackbar.value = true;
  snackbarText.value = res.message;
};
onMounted(async () => {
  goodsId.value = route.params.goodsId;
  await getGoodsDetail();
});
</script>
<template>
  <div class="Buy">
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
    <div class="left">
      <img :src="getImagePath(goodsDetails?.img_url || '')" alt="" />
    </div>
    <div class="right">
      <div class="header" @click="router.go(-1)">
        <v-icon class="iconfont icon-cc-arrow-left"></v-icon>
        Back to Menu
      </div>
      <div class="goodsCate">{{ goodsDetails?.category }}</div>
      <div class="goodsName">{{ goodsDetails?.goods_name }}</div>
      <div class="goodsDes">
        {{ goodsDetails?.goods_desc }}
      </div>
      <div class="goodsPri">
        <div class="left">
          <div class="top">Price</div>
          <div class="bottom">${{ goodsDetails?.price }}</div>
        </div>
        <div class="right">
          <div class="top">Calories</div>
          <div class="bottom">{{ goodsDetails?.calorie }}</div>
        </div>
      </div>
      <div class="add" style="user-select: none" @click="addCarsMethods">
        <v-icon class="iconfont icon-plus"></v-icon>
        Add to Order
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Buy {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 130px;
  height: 35vw;
  width: 100%;
  gap: 80px;
  & .left {
    width: 35%;
    height: 100%;
    border-radius: 15px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.2);
      border-radius: 15px;
    }
  }
  & .right {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    &::selection {
      color: #000;
      background-color: #ffc500;
    }
    & .header {
      color: #5e6781;
      font-size: 18px;
      margin-bottom: 30px;
      transition: all 0.3s ease-out;
      cursor: pointer;
      padding: 10px;
      &:hover {
        color: #fff;
      }
    }
    & .goodsCate {
      color: #ff1102;
      font-family: "微软雅黑";
      font-size: 18px;
      text-transform: uppercase;
      font-weight: bolder;
      letter-spacing: 1px;
    }
    & .goodsName {
      line-height: 1;
      padding-bottom: 20px;
      font-size: 55px;
    }
    & .goodsDes {
      font-size: 24px;
      padding-left: 20px;
      line-height: 1;
      border-left: 2px solid #ffcd11;
    }
    & .goodsPri {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      & .left,
      .right {
        padding: 10px 0;
        border-radius: 10px;
        margin: 0 5px;
        background-color: #121212;
        flex: 1;
        line-height: 1;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        & .top {
          color: #687287;
          font-size: 18px;
          padding-left: 15px;
        }
        & .bottom {
          color: #fff;
          font-size: 30px;
          padding-left: 15px;
        }
      }
    }
    & .add {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      font-size: 2vw;
      cursor: pointer;
      border-radius: 15px;
      transition: all 0.3s ease-in-out;
      padding: 5px;
      text-transform: uppercase;
      background-color: #ffc500;
      &:hover {
        background-color: #fff;
      }
    }
  }
}
.icon-cc-arrow-left,
.icon-plus {
  padding: 10px;
  font-size: 2px;
}
</style>
