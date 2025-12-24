// 管理商品详情的API
import https from "../index";

//获取商品信息
export const getGoodsDetailAPI = async (query: { goods_id: string }) => {
  return await https.get("/goods", { params: query });
};
