// 管理menu的API
import https from "../index";

//获取菜单
export const getOffersAPI = async () => {
  return await https.get("/random");
};
