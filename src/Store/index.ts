// 创建Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 创建Pinia实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 导出Pinia和他的仓库
export default pinia;
export * from "./Modules/Account";
export * from "./Modules/Car";
