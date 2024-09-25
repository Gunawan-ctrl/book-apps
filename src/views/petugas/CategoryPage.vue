<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from '@/components/table/DataTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import FormKategori from '@/components/form/FormKategori.vue';
import axios from '@/boot/axios';
const route = useRoute();
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
    title: 'Master Data',
    disabled: false,
    href: '/'
  },
  {
    title: 'Kategori',
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
    title: 'Nama Kategori',
    sortable: true,
    key: 'name',
    value: 'name'
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
    const response = await axios.get('category', {
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
const addItem = async (form) => {
  try {
    editMode.value ? await axios.put(`category/${idAktif.value}`, form) : await axios.post('category', form);
    getData();
  } catch (error) {
    console.log('error', error);
  } finally {
    resetForm();
  }
};
const deleteItem = async (item) => {
  try {
    await axios.delete(`category/${item.id}`);
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
        labelSearch="Nama kategori"
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
        @deleteItem="deleteItem"
      />
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="450px" @click:outside="resetForm">
    <FormKategori @addItem="addItem" @resetForm="resetForm" :btnloading="loading" :editMode="editMode" :formData="form" />
  </v-dialog>
</template>
