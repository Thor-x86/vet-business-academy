import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import initialize from "./initialize";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = true;

const baseURL = "";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  base: baseURL,
  mode: "history"
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

initialize(baseURL).then(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");

  const splashScreen = document.getElementById("splashscreen");
  if (splashScreen) {
    splashScreen.style.transition = "1s ease-out";
    splashScreen.style.transform = "scale(1.5)";
    splashScreen.style.opacity = "0";
    splashScreen.style.pointerEvents = "none";
    window.setTimeout(() => {
      splashScreen.remove();
    }, 2000);
  }
});
