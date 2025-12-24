import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI, RegisterAPI } from "@/API/Modules/admin.ts";
import type { AccountTypes } from "@/Types/Account.d.ts";

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
    return { Email, LoginMethods, RegisterMethods };
  },
  {
    persist: true,
  }
);
