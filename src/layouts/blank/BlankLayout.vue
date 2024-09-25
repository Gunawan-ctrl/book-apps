// ===============================|| Blank Layout ||=============================== //
<template>
  <v-app>
    <!-- Loader start -->
    <LoaderWrapper />
    <!-- Loader end -->
    <RouterView />
  </v-app>
</template>
<script setup>
import { RouterView } from 'vue-router';
import LoaderWrapper from '@/layouts/admin/LoaderWrapper.vue';
</script>
