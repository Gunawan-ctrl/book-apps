const UserRoutes = {
  path: '/',
  meta: {
    userAuth: true
  },
  redirect: '/home',
  component: () => import('@/layouts/user/UserLayout.vue'),
  children: [
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/user/HomePage.vue')
    },
  ],
};

export default UserRoutes;
