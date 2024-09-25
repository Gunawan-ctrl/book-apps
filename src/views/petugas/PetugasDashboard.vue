<script setup>
import { shallowRef } from 'vue';
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';
import WidgetFive from '@/components/widgets/WidgetFive.vue';
import UniqueVisitor from '../admin/components/UniqueVisitor.vue';
import IncomeOverview from '../admin/components/IncomeOverview.vue';

const fivecards = shallowRef([
  {
    name: 'Total Kategori',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: 'Total Buku',
    earn: '18,800',
    percent: '27.4%',
    color: 'warning',
    icon: FallOutlined,
    text: '1,943'
  },
  {
    name: 'Total Peminjaman',
    earn: '$35,078',
    percent: '27.4%',
    color: 'error',
    icon: FallOutlined,
    text: '$20,395'
  }
]);
</script>
<template>
  <WidgetFive :fivecards="fivecards" />

  <v-row class="mb-0">
    <v-col cols="12" md="8">
      <UniqueVisitor />
    </v-col>
    <v-col cols="12" md="4">
      <IncomeOverview />
    </v-col>
  </v-row>
</template>
