import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Member from "@/views/auth/Member.vue";
import ChangePassword from "@/views/auth/ChangePassword.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import RecordAdd from "@/views/dashboard/RecordAdd.vue";
import AccountList from "@/views/dashboard/AccountList.vue";
import VerifyEmailSuccess from "@/views/auth/VerifyEmailSuccess.vue";
import VerifyEmailFail from "@/views/auth/VerifyEmailFail.vue";
import AccountAdd from "@/views/dashboard/AccountAdd.vue";
import AccountDetail from "@/views/dashboard/AccountDetail.vue";
import Overview from "@/views/dashboard/Overview.vue";
import Post from "@/views/dashboard/Post.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      //   children:[
      //   {
      //     path: '',
      //     component: Advertise,
      //   },
      //   {
      //     path: 'login',
      //     name: 'login',
      //     component: Login,
      //   },
      //   {
      //     path: 'register',
      //     name: 'register',
      //     component: Register,
      //   },
      //   {
      //     path: 'member',
      //     name: 'member',
      //     component: Member,
      //   },
      //   {
      //     path: 'changePassword',
      //     name: 'changePassword',
      //     component: ChangePassword,
      //   }
      // ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/verifySuccess",
      name: "verifySuccess",
      component: VerifyEmailSuccess,
    },
    {
      path: "/verifyFail",
      name: "verifyFail",
      component: VerifyEmailFail,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/dashboard/",
          component: Overview,
        },
        {
          path: "/dashboard/recordadd",
          name: "recordadd",
          component: RecordAdd,
        },
        {
          path: "/dashboard/accountAdd",
          name: "accountadd",
          component: AccountAdd,
        },
        {
          path: "/dashboard/accountList",
          component: AccountList,
        },
        {
          path: "/dashboard/accountDetail/:accountId",
          name: "accountDetail",
          component: AccountDetail,
        },
        {
          path: "/dashboard/post",
          name: "post",
          component: Post,
        }
      ],
    },
    {
      path: "/member",
      name: "member",
      component: Member,
    },
    {
      path: "/changePassword",
      name: "changePassword",
      component: ChangePassword,
    },
  ],
});

export default router;
