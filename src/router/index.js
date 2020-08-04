import Vue from 'vue'
import VueRouter from 'vue-router'
import  hs30010 from '../views/hs30010.vue'
import index from '../views/index'
import add from '../views/add'
import dateQuery from '../views/dateQuery'
import echart from "../views/echart";
Vue.use(VueRouter)
  const routes = [
    {
    path:'/',
    component:index,
    children:[
      {
        path:'/hs30010',
        name:'沪深300',
        component:hs30010
      },
      {
        path:'/add',
        name:'添加',
        component:add
      },
      {
        path:'/dateQuery',
        name:'数据查询',
        component:dateQuery
      },
      {
        path:'/echart',
        name:'表',
        component:echart
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
