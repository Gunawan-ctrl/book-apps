<template>
  <div>
    <VForm v-model="valid" @submit.prevent="addItem">
      <v-card rounded="lg" width="600">
        <v-row no-gutters>
          <v-col cols="9">
            <v-card-text>
              <v-list-item-title class="font-weight-bold text-subtitle-1">
                {{ editMode ? `Ubah ${$route.meta.title}` : `Buat ${$route.meta.title}` }}
              </v-list-item-title>
            </v-card-text>
          </v-col>
          <v-spacer />
          <v-divider class="border-opacity-10 mx-4" />

          <v-col cols="6">
            <v-card-text class="font-weight-bold text-subtitle-2">
              <div>Judul</div>
              <VTextField v-model="form.judul" placeholder="Judul" />
              <div>Kategori</div>
              <v-select v-model="form.kategori" :items="dataKategori" item-title="name" item-value="name" variant="outlined"></v-select>
              <div>Penulis</div>
              <VTextField v-model="form.penulis" required placeholder="Penulis" :rules="[(v) => !!v || 'This field is required']" />
              <div>Deskripsi</div>
              <VTextField v-model="form.deskripsi" required placeholder="Deskripsi" :rules="[(v) => !!v || 'This field is required']" />
            </v-card-text>
            <v-card-text>
              <v-btn color="black" block variant="outlined" @click="resetForm()"> Batal </v-btn>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-card-text class="font-weight-bold text-subtitle-2">
              <div>Penerbit</div>
              <VTextField v-model="form.penerbit" required placeholder="Penerbit" :rules="[(v) => !!v || 'This field is required']" />
              <div>Tahun Terbit</div>
              <VTextField
                placeholder="Pilih Tahun"
                v-model="form.publist_year"
                append-inner-icon=""
                type="date"
                variant="outlined"
                persistent-placeholder
              ></VTextField>
              <div>Upload Cover</div>
              <VFileInput
                v-model="form.upload_cover"
                :rules="rules"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/bmp"
                placeholder="upload image"
                prepend-icon=""
                show-size
                required
              >
                <template v-slot:prepend-inner>
                  <v-icon size="md">mdi-paperclip </v-icon>
                </template>
                <template v-slot:selection="{ fileNames }">
                  <template v-for="fileName in fileNames" :key="fileName">
                    <VChip class="me-2" color="primary" label>
                      {{ fileName }}
                    </VChip>
                  </template>
                </template>
              </VFileInput>
              <div>Upload Buku</div>
              <VFileInput
                v-model="form.upload_buku"
                :rules="rules"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/bmp"
                placeholder="upload image"
                prepend-icon=""
                show-size
                required
              >
                <template v-slot:prepend-inner>
                  <v-icon size="md">mdi-paperclip </v-icon>
                </template>
                <template v-slot:selection="{ fileNames }">
                  <template v-for="fileName in fileNames" :key="fileName">
                    <VChip class="me-2" color="primary" label>
                      {{ fileName }}
                    </VChip>
                  </template>
                </template>
              </VFileInput>
            </v-card-text>
            <v-card-text class="d-flex ga-4">
              <v-btn color="primary" block :disabled="!valid" type="submit" variant="flat" :btnloading="btnloading"> Simpan </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </VForm>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, reactive } from 'vue';
import axios from '@/boot/axios';
const form = reactive({
  judul: '',
  kategori: '',
  penulis: '',
  deskripsi: '',
  penerbit: '',
  publist_year: null,
  cover_buku: 1,
  upload_buku: 1
});
const fileError = ref(null);
const rules = [
  (v) => {
    if (!v || !v.length) {
      fileError.value = 'File is required!';
      return false;
    }
    fileError.value = null;
    return v[0].size < 2000000 || 'Avatar size should be less than 2 MB!';
  }
];
const valid = ref(false);
const dataKategori = ref([]);
const props = defineProps({
  btnloading: Boolean,
  editMode: Boolean,
  formData: Object
});

const emit = defineEmits(['addItem', 'resetForm']);

const getKategori = async () => {
  try {
    const response = await axios.get(`category`);
    dataKategori.value = response.data;
    console.log('response', response);
  } catch (error) {
    console.log('error', error);
  }
};

const resetForm = () => {
  emit('resetForm');
};

const addItem = () => {
  emit('addItem', form);
};

watch(
  () => props.editMode,
  (newVal) => {
    if (newVal) {
      form.judul = props.formData.judul;
      form.kategori = props.formData.kategori;
      form.penulis = props.formData.penulis;
      form.deskripsi = props.formData.deskripsi;
      form.penerbit = props.formData.penerbit;
      form.publist_year = props.formData.publist_year;
      form.cover_buku = props.formData.cover_buku;
      form.upload_buku = props.formData.upload_buku;
    } else {
      (form.judul = ''),
        (form.kategori = ''),
        (form.penulis = ''),
        (form.deskripsi = ''),
        (form.penerbit = ''),
        (form.publist_year = ''),
        (form.cover_buku = '');
      form.upload_buku = '';
    }
  },
  { immediate: true }
);
onMounted(() => {
  getKategori();
});
</script>
