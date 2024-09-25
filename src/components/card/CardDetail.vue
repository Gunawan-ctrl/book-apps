<template>
  <div>
    <v-card elevation="0" variant="outlined" height="350" rounded="0">
      <v-card-item>
        <v-card-title>{{ data.judul }}</v-card-title>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>
          <span class="me-1">{{ data.kategori }}</span>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <div>{{ data.deskripsi }}</div>
        <div class="mt-4">
          Penerbit: <span class="mt-4 text-subtitle-1">{{ data.penerbit }}</span>
        </div>
        <div>
          Tahun: <span class="mt-4 text-subtitle-1">{{ data.publist_year }}</span>
        </div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>
      <v-card-title>Book availability</v-card-title>
      <div class="px-4 mb-2">Baca buku ini sekarang juga</div>
      <v-card-actions>
        <v-btn color="primary" variant="tonal" text="Baca" block border @click="reserve"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  data: Object
});

const reserve = () => {
  console.log('reserve');
};
</script>
