import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/posts/Index.vue')
  },
  {
    path: '/posts',
    name: 'Post',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        meta: {},
        name: 'postIndex',
        component: () => import(
          `@/views/posts/Index.vue`
        )
      },
      {
        path: 'create',
        meta: {},
        name: 'postCreate',
        component: () => import(
          `@/views/posts/Create.vue`
        )
      },
      {
        path: 'edit/:id',
        meta: {},
        name: 'postEdit',
        component: () => import(
          `@/views/posts/Edit.vue`
        )
      },
      {
        path: ':id',
        meta: {},
        name: 'postShow',
        component: () => import(
          `@/views/posts/Show.vue`
        )
      },
    ],
  },
  {
    path: '/galleries',
    name: 'Gallery',
    component: () => import('../views/galleries/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
