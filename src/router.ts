import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'tasks',
    },
    {
      path: '/tasks',
      component: () => import('./views/Tasks.vue'),
    },
    {
      path: '/kanban',
      component: () => import('./views/Kanban.vue'),
    },
    {
      path: '/activity',
      component: () => import('./views/Activity.vue'),
    },
    {
      path: '/calendar',
      component: () => import('./views/PageNotFound.vue'),
    },
    {
      path: '/files',
      component: () => import('./views/Files.vue'),
    },
    {
      path: '*',
      component: () => import('./views/PageNotFound.vue'),
    },
  ],
});
