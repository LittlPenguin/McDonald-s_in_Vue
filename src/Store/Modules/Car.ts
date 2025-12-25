import { ref } from "vue";
import { defineStore } from "pinia";
import {
  addCarAPI,
  getCarListAPI,
  deleteCarListAPI,
  changeQuantityAPI,
} from "@/API/Modules/car";
export const useCarStore = defineStore(
  "CarStore",
  () => {
    const total = ref(0);
    const carList = ref([]);
    // 获取购物车
    const getCarList = async (user_email: string) => {
      const { data: res } = await getCarListAPI({ user_email });
      carList.value = res.data;
      total.value = 0;
      res.data.forEach((item: any) => {
        total.value += item.buy_quantity;
      });
    };

    // 添加购物车列表
    const addCar = async (goods_id: string, user_email: string) => {
      const { data: res } = await addCarAPI({ goods_id, user_email });
      total.value = res.data?.total ?? 0;
      return res;
    };

    // 清空购物车
    const clearCar = async (user_email: string) => {
      total.value = 0;
      carList.value = [];
      const res = await deleteCarListAPI({ user_email });
      return res;
    };

    // 改变购物车数量
    const changeQuantity = async (
      goods_id: string,
      user_email: string,
      type: string
    ) => {
      const { data } = await changeQuantityAPI({ goods_id, user_email, type });
      if (data.code === 200) {
        const newCar: any = carList.value.find(
          (item: any) => item.goods_id === data.data.goods_id
        );
        if (newCar) {
          newCar.buy_quantity = data.data.buy_quantity;
          if (newCar.buy_quantity === 0) {
            carList.value = carList.value.filter(
              (item: any) => item.goods_id !== data.data.goods_id
            );
          }
        }
        total.value = 0;
        carList.value.forEach((item: any) => {
          total.value += item.buy_quantity;
        });
      }
    };

    // 退出登录清空购物车
    const outLo = async () => {
      total.value = 0;
      carList.value = [];
    };
    return {
      carList,
      total,
      getCarList,
      addCar,
      clearCar,
      changeQuantity,
      outLo,
    };
  },
  {
    persist: true,
  }
);
