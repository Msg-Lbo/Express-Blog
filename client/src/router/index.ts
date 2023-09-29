import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home_page/home/index.vue"),
      redirect: "/list",
      children: [
        {
          path: "/list",
          name: "list",
          component: () => import("@/views/home_page/article_list/index.vue"),
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('@/views/home_page/categories/index.vue')
        },
        {
          path: '/archives',
          name: 'archives',
          component: () => import('@/views/home_page/archives/index.vue')
        },
        {
          path: '/friends',
          name: 'friends',
          component: () => import('@/views/home_page/friends/index.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/home_page/about/index.vue')
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login_page/index.vue')
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import('@/views/admin_page/home_admin/index.vue'),
      redirect: '/article-manager',
      children: [
        {
          path: '/article-manager',
          name: 'article-manager',
          component: () => import('@/views/admin_page/article_admin/index.vue')
        }
      ]
    }
  ],
});

export default router;