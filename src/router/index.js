import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
const originPush = VueRouter.prototype.push
//避免路由重复
VueRouter.prototype.push = function push(location){
  return originPush.call(this,location).catch(err=>err)
}
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component: Login},
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name:'home',
        component:()=>import('@/views/childHome/childHome.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/Product/product')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/user')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/Setting/setting')
      },
      {
        path: '/Calculator',
        name: 'Calculator',
        component: () => import('@/views/Other/Calculator')
      },
      {
        path: '/TodoList',
        name: 'TodoList',
        component: () => import('@/views/Other/TodoList')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
