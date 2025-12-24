// 管理账户的API
import https from "../index";

// 加入
export const addCarAPI = async (CarData: {
  goods_id: string;
  user_email: string;
}) => {
  return await https.post("/car", CarData);
};
