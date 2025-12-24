import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI, RegisterAPI } from "@/API/Modules/admin.ts";
import type { AccountTypes } from "@/Types/Account.d.ts";
import { useCarStore } from "./Car";

export const useAccountStore = defineStore(
  "AccountStore",
  () => {
    const Email = ref("");
    // 登录
    const LoginMethods = async (data: AccountTypes) => {
      const { data: res } = await loginAPI(data);
      if (res.code === 200) {
        Email.value = res.data.CountEmail;
      }
      return res;
    };

    // 注册
    const RegisterMethods = async (data: AccountTypes) => {
      const { data: res } = await RegisterAPI(data);
      return res;
    };
    // 退出登录
    const clearLogin = async () => {
      Email.value = "";
      const carStore = useCarStore();
      carStore.outLo();
    };
    return { Email, LoginMethods, RegisterMethods, clearLogin };
  },
  {
    persist: true,
  }
);
