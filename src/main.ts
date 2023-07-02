import { createApp } from "vue";
import "./style.css";
import "vue3-emoji-picker/css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Maker from "./pages/Maker.vue";
import Database from "./pages/Database.vue";

const routes = [
  { path: "/", component: Maker },
  { path: "/db", component: Database },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
