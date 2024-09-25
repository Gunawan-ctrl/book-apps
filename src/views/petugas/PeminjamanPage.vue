<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import DataTable from '@/components/table/DataTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import axios from '@/boot/axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const pageCount = ref(1);
const search = ref('');
const debounceTimeout = ref(null);
const breadcrumbs = shallowRef([
  {
    title: 'Pages',
    disabled: false,
    href: '#'
  },
  {
    title: route.meta.title,
    disabled: true,
    href: '#'
  }
]);

const headers = ref([
  {
    title: 'Peminjam',
    align: 'start',
    sortable: true,
    key: 'peminjam',
    value: 'peminjam'
  },
  {
    title: 'Buku',
    sortable: true,
    key: 'buku',
    value: 'buku'
  },
  {
    title: 'Tgl Peminjaman',
    key: 'tgl_peminjaman',
    sortable: true,
    value: 'tgl_peminjaman'
  },
  {
    title: 'Tgl Pengembalian',
    key: 'tgl_pengembalian',
    sortable: true,
    value: 'tgl_pengembalian'
  },
  {
    title: 'Status',
    key: 'status',
    sortable: true,
    value: 'status'
  },
  { title: 'Aksi', key: 'actions', sortable: false, align: 'center' }
]);
const data = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    const response = await axios.get('peminjaman', {
      params: {
        page: currentPage.value,
        per_page: itemsPerPage.value,
        search: search.value
      }
    });
    data.value = response.data;
  } catch (error) {
    console.log('error', error);
  } finally {
    loading.value = false;
  }
};
const deleteItem = async (item) => {
  try {
    await axios.delete(`peminjaman/${item.id}`);
    getData();
  } catch (error) {
    console.log('error', error);
  }
};
const updateSearch = (newSearch) => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    currentPage.value = 1;
    search.value = newSearch;
    getData();
  }, 800);
};
const updatePage = (newPage) => {
  currentPage.value = newPage;
  getData();
};
onMounted(() => {
  getData();
});
</script>

<template>
  <BaseBreadcrumb :title="route.meta.title" :breadcrumbs="breadcrumbs" />
  <v-row>
    <v-col cols="12" md="12">
      <DataTable
        labelSearch="Judul, kategori ..."
        :btnAdd="`Tambah ${route.meta.title}`"
        :headers="headers"
        :data="data"
        :loading="loading"
        :itemsPerPage="itemsPerPage"
        :pageCount="pageCount"
        :search="search"
        :currentPage="currentPage"
        @update:search="updateSearch"
        @update:currentPage="updatePage"
        @getData="getData"
        @deleteItem="deleteItem"
      />
    </v-col>
  </v-row>
</template>
