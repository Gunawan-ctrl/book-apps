<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import DataTable from '@/components/table/DataTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import FormBuku from '@/components/form/FormBuku.vue';
import axios from '@/boot/axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const form = ref(null);
const editMode = ref(false);
const idAktif = ref(false);
const dialog = ref(false);
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
    title: 'Tanggal Buat',
    align: 'start',
    sortable: true,
    key: 'created_at',
    value: 'created_at'
  },
  {
    title: 'Judul',
    sortable: true,
    key: 'judul',
    value: 'judul'
  },
  {
    title: 'Kategori',
    key: 'kategori',
    sortable: true,
    value: 'kategori'
  },
  {
    title: 'Penulis',
    key: 'penulis',
    sortable: true,
    value: 'penulis'
  },
  {
    title: 'Deskripsi',
    key: 'deskripsi',
    sortable: true,
    value: 'deskripsi'
  },
  { title: 'Aksi', key: 'actions', sortable: false, align: 'center' }
]);
const data = ref([]);

const getData = async () => {
  loading.value = true;
  try {
    const response = await axios.get('books', {
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
const openDialog = (edit, item) => {
  editMode.value = edit;
  if (editMode.value) {
    form.value = { ...item };
    console.log('form.value', form.value);
    idAktif.value = item.id;
  } else {
    form.value = {};
  }
  dialog.value = true;
};
const addItem = async (form) => {
  try {
    editMode.value ? await axios.put(`books/${idAktif.value}`, form) : await axios.post('books', form);
    getData();
  } catch (error) {
    console.log('error', error);
  } finally {
    resetForm();
  }
};
const showDetail = (item) => {
  router.push({ name: 'DetailBuku', params: { id: item.id } });
};
const deleteItem = async (item) => {
  try {
    await axios.delete(`books/${item.id}`);
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

const resetForm = () => {
  form.value = null;
  dialog.value = false;
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
        @addItem="openDialog"
        @editItem="openDialog(true, $event)"
        @showDetail="showDetail"
        @deleteItem="deleteItem"
      />
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="450px" @click:outside="resetForm">
    <FormBuku @addItem="addItem" @resetForm="resetForm" :btnloading="loading" :editMode="editMode" :form-data="form" />
  </v-dialog>
</template>
