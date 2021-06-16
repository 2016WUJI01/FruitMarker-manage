import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import PageBuy from "@/components/pages/buy/index";
import PageEmployee from "@/components/pages/employee/index";
import PageFruit from "@/components/pages/fruit/index";
import PageMember from "@/components/pages/member/index";
import PageSell from "@/components/pages/sell/index";
import PageUser from "@/components/pages/user/index";
import PageHome from "@/components/pages/home/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/layout",
      name: "layout",
      component: Layout,
      children: [
        { path: "/home", name: "Home", component: PageHome },
        {
          path: "/buy",
          name: "Buy",
          component: PageBuy
        },
        {
          path: "/employee",
          name: "Employee",
          component: PageEmployee
        },
        {
          path: "/fruit",
          name: "Fruit",
          component: PageFruit
        },
        {
          path: "/member",
          name: "Member",
          component: PageMember
        },
        {
          path: "/sell",
          name: "Sell",
          component: PageSell
        },
        {
          path: "/user",
          name: "User",
          component: PageUser
        }
      ]
    }
  ]
});
