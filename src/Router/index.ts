import { createWebHistory, createRouter } from "vue-router";

import Layout from "@/pages/Layout/index.vue";
import Main from "@/pages/Layout/modules/main.vue";
import Menu from "@/pages/Menu/index.vue";
import Offers from "@/pages/Offers/index.vue";
import Stores from "@/pages/Stores/index.vue";
import Trending from "@/pages/Trending/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: Main },
      { path: "/menu", component: Menu },
      { path: "/offers", component: Offers },
      { path: "/stores", component: Stores },
      { path: "/trending", component: Trending },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
