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
      component: () => import("@/views/PostList")
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
      component: ()=> import("@/views/Login")
    },
    {
      name: "user",
      path: "/user/:username",
      component: ()=> import("@/views/User"),
      props: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});

router.afterEach(route => {
  LoadingBar.finish();
});

export default router;
