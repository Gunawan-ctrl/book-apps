const PetugasRoutes = {
  path: '/',
  meta: {
    petugasAuth: true
  },
  redirect: '/dashboard-petugas',
  component: () => import('@/layouts/petugas/PetugasLayout.vue'),
  children: [
    {
      name: 'dashboard-petugas',
      path: '/dashboard-petugas',
      component: () => import('@/views/petugas/PetugasDashboard.vue')
    },
    {
      name: 'category',
      path: '/category-page',
      component: () => import('@/views/petugas/CategoryPage.vue')
    },
    {
      name: 'Books',
      path: '/books-page',
      meta: {
        title: 'buku'
      },
      component: () => import('@/views/petugas/BukuPage.vue')
    },
    {
      name: 'booksDetail',
      path: '/books-detail/:id',
      meta: {
        title: 'detail buku'
      },
      component: () => import('@/views/petugas/DetailBuku.vue')
    },
    {
      name: 'Peminjaman',
      path: '/peminjaman-page',
      meta: {
        title: 'peminjaman'
      },
      component: () => import('@/views/petugas/PeminjamanPage.vue')
    }
  ],
};

export default PetugasRoutes;
