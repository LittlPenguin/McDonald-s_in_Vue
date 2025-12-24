// 管理menu的API
import https from "../index";

//获取菜单
export const getMenuAPI = async (query: { Category: string }) => {
  return await https.get("/menu", { params: query });
};
