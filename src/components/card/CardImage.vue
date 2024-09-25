<template>
  <div>
    <v-card elevation="0" :width="width">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate />
      </template>

      <v-img :height="height" :src="data" cover></v-img>
    </v-card>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: String,
    default: 'https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg'
  },
  height: {
    type: String,
    default: '350'
  },
  width: {
    type: String,
    default: '100%'
  }
});
</script>
