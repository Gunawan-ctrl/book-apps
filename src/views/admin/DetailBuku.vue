<script setup>
import { onMounted, shallowRef, ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import CardImage from '@/components/card/CardImage.vue';
import CardDetail from '@/components/card/CardDetail.vue';
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
    title: route.meta.title,
    disabled: true,
    href: '#'
  }
]);
const data = ref([]);

const getData = async () => {
  try {
    const response = await axios.get(`books/${route.params.id}`);
    data.value = response.data;
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
    <v-row no-gutters align="start" justify="start">
      <v-col cols="12" md="5">
        <CardImage />
      </v-col>
      <v-col cols="12" md="7">
        <CardDetail :data="data" />
      </v-col>
    </v-row>
  </UiParentCard>
</template>
