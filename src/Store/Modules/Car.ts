import { defineStore } from "pinia";
import { ref } from "vue";
import { addCarAPI } from "@/API/Modules/car";
export const useCarStore = defineStore(
  "CarStore",
  () => {
    const goodsList = ref([]);

    const addCar = async (goods_id: string, user_email: string) => {
      const res = await addCarAPI({ goods_id, user_email });
      console.log(res);
    };
    return { goodsList, addCar };
  },
  {
    persist: true,
  }
);
