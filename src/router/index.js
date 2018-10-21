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
        title: "CNode：Node.js专业中文社区"
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
    },
    {
      name: "edit",
      path: "/edit/:id",
      component: () => import("@/views/Edit"),
      props: true,
      meta: {
        title: "编辑主题"
      }
    },{
      name: "message",
      path: "/my/message",
      component: ()=> import("@/views/Message"),
      props: true,
      meta: {
        title: "消息中心"
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
