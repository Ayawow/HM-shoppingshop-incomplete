import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Prodetail from '@/views/prodetail/index.vue'
import Pay from '@/views/pay/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import MyOrder from '@/views/myorder/index.vue'

import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

Vue.use(VueRouter)


const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User },
    ]
  },
  //动态路由传参
  { path: '/prodetail/:id', component: Prodetail },
  { path: '/pay', component: Pay },
  { path: '/searchlist', component: SearchList },
  { path: '/search', component: Search },
  { path: '/myorder', component: MyOrder },
]

const router = new VueRouter({
  routes
})

//全局前置导航守卫
//to：到哪儿去
//from：从哪儿来
//next() ：是否放行
//  1.next()  直接放行，到to的路径
//  2.next(路径)  拦截，拦截到next里面配置的路径
const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  //非权限

  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }


  //权限

})


export default router
