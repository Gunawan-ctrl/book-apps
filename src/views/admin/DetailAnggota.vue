<script setup>
import { onMounted, shallowRef, ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
// import CardDetail from '@/components/card/CardDetail.vue';
import { useRoute } from 'vue-router';
import axios from '@/boot/axios';
const route = useRoute();
const breadcrumbs = shallowRef([
  {
    title: 'Master Data',
    disabled: false,
    href: '/'
  },
  {
    title: 'Anggota',
    disabled: true,
    href: '#'
  }
]);
const data = ref([]);
const getData = async () => {
  try {
    const response = await axios.get(`member/${route.params.id}`);
    data.value = response.data;
    console.log('response', response);
  } catch (error) {
    console.log('error', error);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <BaseBreadcrumb :title="route.meta.title" :breadcrumbs="breadcrumbs" />
  <UiParentCard title="Details">
    <v-row>
      <v-col cols="4" md="2">
        <v-list lines="two">
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item title="Nama"></v-list-item>
          </v-card>

          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item title="Email"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item title="Alamat"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item title="Username"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item title="Level"></v-list-item>
          </v-card>
        </v-list>
      </v-col>
      <v-col cols="8" md="10">
        <v-list lines="two">
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item :title="data.nama_lengkap"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item :title="data.email"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item :title="data.alamat"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item :title="data.username"></v-list-item>
          </v-card>
          <v-card elevation="0" variant="outlined" class="mb-2">
            <v-list-item :title="data.level === 1 ? 'Admin' : 'Member'"></v-list-item>
          </v-card>
        </v-list>
      </v-col>
    </v-row>
  </UiParentCard>
</template>
