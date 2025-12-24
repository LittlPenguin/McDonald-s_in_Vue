import { ref } from "vue";
import { defineStore } from "pinia";
import { addCarAPI, getCarListAPI, deleteCarListAPI } from "@/API/Modules/car";
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

    const outLo = async () => {
      total.value = 0;
      carList.value = [];
    };
    return { carList, total, getCarList, addCar, clearCar, outLo };
  },
  {
    persist: true,
  }
);
