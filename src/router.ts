import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import AppLayout from "./layouts/AppLayout.vue";
import { useAuthStore } from "./stores/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./pages/auth/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    component: () => import("./pages/auth/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: () => import("./pages/Dashboard.vue") },
      { path: "dashboard", component: () => import("./pages/Dashboard.vue") },
      { path: "drugs", component: () => import("./pages/drugs/DrugsList.vue") },
      {
        path: "pharmacies",
        component: () => import("./pages/pharmacies/PharmacyList.vue"),
      },
      {
        path: "prescriptions",
        component: () => import("./pages/prescriptions/PrescriptionList.vue"),
      },
      {
        path: "audits",
        component: () => import("./pages/audits/Auditlog.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // 初始化认证状态
  if (!authStore.user && !authStore.loading) {
    await authStore.initAuth();
  }

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    // 如果已登录且访问登录/注册页面，重定向到首页
    if (
      (to.path === "/login" || to.path === "/register") &&
      authStore.isAuthenticated
    ) {
      next("/");
    } else {
      next();
    }
  }
});
