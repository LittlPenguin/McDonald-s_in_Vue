// 管理账户的API
import https from "./index";
// 登录
export const login = (data) => {
  return https.post("/admin/login", data);
};

// 注册
