const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('pages/LoginPage.vue'),
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/my-tasks',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
    meta: {
      requiresAuth: true,
      title: 'My Tasks',
      showInMenu: true,
      icon: 'check',
    }, // Protects this route
  },
  {
    path: '/testing',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TestingPage.vue') }
    ],
    meta: {
      requiresAuth: true,
      title: 'Testing Page',
      showInMenu: true,
      icon: 'download',
    }, // Protects this route
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];



export default routes
