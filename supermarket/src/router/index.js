import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
  {
    name: "search",
    path: "/search/index",
    component: () => import("@/views/search/index.vue"),
    meta: {
      title: "店铺搜索",
    },
  },
  {
    name: "search_detail",
    path: "/search/detail",
    component: () => import("@/views/search/detail.vue"),
    meta: {
      title: "操作按钮",
    },
  },
  {
    name: "search_shopInterV",
    path: "/search/shopInterV",
    component: () => import("@/views/search/shopInterV.vue"),
    meta: {
      title: "店招采集",
    },
  },
  {
    name: "search_lienceCap",
    path: "/search/lienceCap",
    component: () => import("@/views/search/lienceCap.vue"),
    meta: {
      title: "许可证采集",
    },
  },
  {
    name: "CountPhoto",
    path: "/search/counterCap",
    component: () => import("@/views/search/counterCap.vue"),
    meta: {
      title: "柜台采集",
    },
  },
  {
    name: "search_experZone",
    path: "/search/experZone",
    component: () => import("@/views/search/experZone.vue"),
    meta: {
      title: "体验区采集",
    },
  },
  {
    name: "search_repertoryCap",
    path: "/search/repertoryCap",
    component: () => import("@/views/search/repertoryCap.vue"),
    meta: {
      title: "库存采集",
    },
  },
  {
    name: "require",
    path: "/require/index",
    component: () => import("@/views/require/index.vue"),
    meta: {
      title: "上传要求",
    },
  },
  {
    name: "mycap",
    path: "/myCap/index",
    component: () => import("@/views/myCap/index.vue"),
    meta: {
      title: "我的采集",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
