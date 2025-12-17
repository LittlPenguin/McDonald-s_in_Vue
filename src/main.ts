import { createApp } from "vue";
import "@/style.scss";

// 导入Pinia
import pinia from "@/Store/index";

// 导入router
import router from "@/Router/index";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import App from "@/App.vue";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
