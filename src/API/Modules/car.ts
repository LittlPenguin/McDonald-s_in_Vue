// 管理账户的API
import https from "../index";

// 加入
export const addCarAPI = async (CarData: {
  goods_id: string;
  user_email: string;
}) => {
  return await https.post("/car", CarData);
};

// 获取
export const getCarListAPI = async (user_email: { user_email: string }) => {
  return await https.get("/getcar", { params: user_email });
};

// 清空
export const deleteCarListAPI=async (user_email: { user_email: string }) => {
  return await https.get("/clearcar", { params: user_email });
}
