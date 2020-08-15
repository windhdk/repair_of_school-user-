import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in foodion use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    // hidden: true,
    children: [{
      path: '/index',
      name: 'index',
      meta: {
        title: '首页',
        auth: true,
        icon: 'table',
        breadcrumb: false
      },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/password',
    component: Layout,
    name: 'password',
    meta: { title: '密码管理', icon: 'user', auth: true },
    children: [
      {
        path: '/password',
        name: 'password_list',
        component: () => import('@/views/password/list'),
        meta: { title: '密码管理', breadcrumb: false }
      }
    ]
  },
  {
    path: '/suggest',
    component: Layout,
    name: 'suggest',
    meta: { title: '意见反馈', icon: 'eye' },
    children: [
      {
        path: '/suggest',
        name: 'suggest_list',
        component: () => import('@/views/suggest/list'),
        meta: { title: '意见反馈', breadcrumb: false }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    name: 'upload',
    meta: { title: '文件上传', icon: 'tree' },
    children: [
      {
        path: '/upload',
        name: 'upload_list',
        component: () => import('@/views/upload/list'),
        meta: { title: '文件上传', breadcrumb: false }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
