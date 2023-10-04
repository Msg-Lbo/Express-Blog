import { useUserStore } from "@/store/userSotre";
import { createRouter, createWebHistory } from "vue-router";
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: () => import('@/views/login_page/index.vue'),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import('@/views/admin_page/home_admin/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin_page/dashboard/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/article-manager',
          name: 'article-manager',
          component: () => import('@/views/admin_page/article_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/category-manager',
          name: 'category-manager',
          component: () => import('@/views/admin_page/category_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/comments-manager',
          name: 'comments-manager',
          component: () => import('@/views/admin_page/comments_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/friends-manager',
          name: 'friends-manager',
          component: () => import('@/views/admin_page/friends_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/other-settings',
          name: 'other-settings',
          component: () => import('@/views/admin_page/settings_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: '/images-manager',
          name: 'images-manager',
          component: () => import('@/views/admin_page/image_admin/index.vue'),
          meta: {
            requireAuth: true
          },
        }
      ]
    }
  ],
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const username = userStore.userInfo.username
  // 如果用户没有登录，但是访问的是后台页面，则跳转到登录页面
  if (!username && to.meta.requireAuth) {
    next('/login')
    message.warning('请先登录')
  }
  next()
});
export default router;