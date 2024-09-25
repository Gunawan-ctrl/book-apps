<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
  search: String,
  labelSearch: String,
  btnAdd: String,
  headers: Array,
  data: Array,
  loading: Boolean,
  itemsPerPage: Number,
  pageCount: Number,
  currentPage: Number
});
const emit = defineEmits([
  'deleteItem',
  'showDetail',
  'getData',
  'update:search',
  'update:currentPage',
  'addItem',
  'editItem',
  'updateStatus'
]);

const localSearch = ref(props.search);
const updatePage = (page) => {
  emit('update:currentPage', page); // Emit perubahan page ke parent
};
const addItem = () => {
  emit('addItem');
};
const editItem = (item) => {
  emit('editItem', item);
};
const deleteItem = (item) => {
  emit('deleteItem', item);
};
const showDetail = (item) => {
  emit('showDetail', item);
};
watch(localSearch, (newSearch) => {
  emit('update:search', newSearch);
});
watch(
  () => props.search,
  (newSearch) => {
    localSearch.value = newSearch;
  }
);
</script>

<template>
  <div>
    <v-row no-gutters>
      <v-col :cols="btnAdd ? '5' : '12'" md="4">
        <div class="text-subtitle-1">Cari</div>
        <VCard class="mb-6" elevation="0">
          <VTextField v-model="localSearch" :label="labelSearch" type="text" single-line hide-details />
        </VCard>
      </v-col>
      <v-spacer />
      <v-col cols="auto" v-show="!['peminjaman'].includes(route.meta.title)">
        <VCard class="mt-8">
          <v-btn class="text-capitalize" variant="flat" color="primary" dense height="35px" @click="addItem">
            {{ btnAdd }}
          </v-btn>
        </VCard>
      </v-col>
    </v-row>
    <v-card variant="outlined">
      <v-data-table :headers="headers" :items="data" :loading="loading" :items-per-page="itemsPerPage">
        <template v-slot:bottom>
          <v-divider />

          <div class="py-3 d-flex justify-end">
            <v-pagination
              :model-value="currentPage"
              :length="pageCount"
              :total-visible="6"
              density="compact"
              @update:modelValue="updatePage"
            />
          </div>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          <span>{{ item.created_at ? item.created_at : 'Maret 14, 2024 14:42' }}</span>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ item.createdAt }}</span>
        </template>

        <!-- Anggota -->
        <template v-slot:[`item.level`]="{ item }">
          <span>{{ item.level === 1 ? 'Admin' : item.level === 2 ? 'Petugas' : 'Peminjam' }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center align-center text-center ga-2">
            <VBtn class="text-capitalize text-red" color="red" variant="outlined" @click="deleteItem(item)">Hapus</VBtn>
            <VBtn
              color="warning"
              v-if="!['peminjaman', 'kategori'].includes(route.meta.title)"
              variant="outlined"
              @click="showDetail(item)"
              class="font-weight-bold"
            >
              Detail
            </VBtn>
            <VBtn variant="outlined" @click="editItem(item)" class="font-weight-bold" v-if="!['peminjaman'].includes(route.meta.title)">
              Ubah
            </VBtn>
          </div>
        </template>
        <template v-slot:no-data>
          <p class="text-red">The Table is Empty. Please insert data with the above Button.</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
