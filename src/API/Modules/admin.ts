// 管理账户的API
import https from "../index";
import type { AccountTypes } from "@/Types/Account";

// 登录
export const loginAPI = async (data: AccountTypes) => {
  return await https.post("/login", data);
};

// 注册
export const RegisterAPI = async (data: AccountTypes) => {
  return await https.post("/register", data);
};
