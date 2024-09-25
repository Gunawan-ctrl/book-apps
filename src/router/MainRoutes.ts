const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/admin/DashboardLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/admin/DefaultDashboard.vue')
    },
    {
      name: 'Category',
      path: '/category',
      meta: {
        title: 'kategori'
      },
      component: () => import('@/views/admin/CategoryPage.vue')
    },
    {
      name: 'Anggota',
      path: '/member',
      meta: {
        title: 'anggota'
      },
      component: () => import('@/views/admin/AnggotaPage.vue')
    },
    {
      name: 'DetailAnggota',
      path: '/member-detail/:id',
      meta: {
        title: 'detail anggota'
      },
      component: () => import('@/views/admin/DetailAnggota.vue')
    },
    {
      name: 'Users',
      path: '/users',
      meta: {
        title: 'users'
      },
      component: () => import('@/views/admin/UsersPage.vue')
    },
    {
      name: 'Buku',
      path: '/books',
      meta: {
        title: 'data buku'
      },
      component: () => import('@/views/admin/BukuPage.vue')
    },
    {
      name: 'DetailBuku',
      path: '/book-detail/:id',
      meta: {
        title: 'detail buku'
      },
      component: () => import('@/views/admin/DetailBuku.vue')
    },
    {
      name: 'pinjam',
      path: '/peminjaman',
      meta: {
        title: 'peminjaman'
      },
      component: () => import('@/views/admin/PeminjamanPage.vue')
    }
  ],
};

export default MainRoutes;
