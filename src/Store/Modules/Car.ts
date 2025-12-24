import { ref } from "vue";
import { defineStore } from "pinia";
import { addCarAPI } from "@/API/Modules/car";
export const useCarStore = defineStore(
  "CarStore",
  () => {
    const total = ref("");
    // 购物车列表
    const addCar = async (goods_id: string, user_email: string) => {
      const { data: res } = await addCarAPI({ goods_id, user_email });
      total.value = res.data.total;
      return res;
    };
    return { total, addCar };
  },
  {
    persist: true,
  }
);
