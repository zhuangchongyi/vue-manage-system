import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import('../layout/Home.vue'),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/table',
          component: () => import('../views/BaseTable.vue'),
          meta: {
            title: '基础表格'
          }
        },
        {
          path: '/messages',
          component: () => import('../views/Messages.vue'),
          meta: {
            title: 'tab选项卡'
          }
        },
        {
          path: '/i18n',
          component: () => import('../views/I18n.vue'),
          meta: {
            title: '国际化'
          }
        },
        {
          path: '/404',
          component: () => import('../views/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: () => import('../views/403.vue'),
          meta: {
            title: '403'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});