import Vue from "vue";
import Router from "vue-router";
import { LoadingBar } from "iview";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "root",
      path: "/",
      component: () => import("@/views/PostList"),
      meta: {
        title: "主页"
      }
    },
    {
      name: "topic",
      path: "/topic/:id",
      component: () => import("@/views/Topic"),
      props: true
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login"),
      meta: {
        title: "登录"
      }
    },
    {
      name: "user",
      path: "/user/:username",
      component: () => import("@/views/User"),
      props: true,
      meta: {
        title: "个人主页"
      }
    },
    {
      name: "create",
      path: "/create",
      component: () => import("@/views/Create"),
      props: true,
      meta: {
        title: "新建主题"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(route => {
  LoadingBar.finish();
});

export default router;
