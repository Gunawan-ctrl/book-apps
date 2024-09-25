<script setup>
import { shallowRef } from 'vue';

const drawer = shallowRef(false);

const items = [
  {
    text: 'Dashboard'
  },
  {
    text: 'Buku'
  },
  {
    text: 'Kategori'
  },
  {
    text: 'Settings'
  },
  {
    text: 'Login',
    to: '/auth/login'
  }
];
</script>

<template>
  <div>
    <v-navigation-drawer location="right" v-model="drawer" disable-resize-watcher>
      <v-list nav>
        <v-list-item v-for="(item, i) in items" :key="i" :active="i === 0" link :title="item.text" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="px-md-16" prominent>
      <v-img class="me-sm-8" max-width="40" src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg" />

      <template #append>
        <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
      </template>

      <v-spacer />

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn v-for="(item, i) in items" :key="i" :active="i === 0" class="me-2 text-none" slim v-bind="item" />
      </template>
    </v-app-bar>
  </div>
</template>
