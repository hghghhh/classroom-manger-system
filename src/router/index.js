import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import classroomMsg from "../views/classroomMsg.vue";
import mangerLogin from "../components/mangerLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/classroomMsg",
    name: "classroomMsg",
    component: classroomMsg
  },
  {
    path: "/login/mangerLogin",
    name: "mangerLogin",
    component: mangerLogin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
