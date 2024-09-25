<template>
  <v-app>
    <HeaderLayout />
    <v-main class="px-md-16">
      <v-container fluid>
        <div>
          <LoaderWrapper />
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import HeaderLayout from '@/layouts/header/HeaderLayout.vue';
import { RouterView } from 'vue-router';
import LoaderWrapper from '@/layouts/admin/LoaderWrapper.vue';
</script>
