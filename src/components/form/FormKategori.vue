<template>
  <div>
    <VForm v-model="valid" @submit.prevent="addItem">
      <v-card rounded="lg">
        <v-row no-gutters class="mb-4">
          <v-col cols="9">
            <v-card-text>
              <v-list-item-title class="font-weight-bold text-subtitle-1">
                {{ editMode ? `Ubah ${$route.meta.title}` : `Buat ${$route.meta.title}` }}
              </v-list-item-title>
            </v-card-text>
          </v-col>
          <v-spacer />
          <v-divider class="border-opacity-10 mx-4" />

          <v-col cols="12">
            <v-card-text class="font-weight-bold text-subtitle-2">
              <div>Name</div>
              <VTextField v-model="form.name" placeholder="Name kategori" />
              <div>Deskripsi</div>
              <VTextField v-model="form.deskripsi" required placeholder="Deskripsi" :rules="[(v) => !!v || 'This field is required']" />
            </v-card-text>
            <v-card-text class="d-flex ga-4">
              <v-btn color="black" width="48%" variant="outlined" @click="resetForm()"> Batal </v-btn>
              <v-btn color="primary" width="48%" :disabled="!valid" type="submit" variant="flat" :btnloading="btnloading"> Simpan </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </VForm>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
const form = reactive({
  name: '',
  deskripsi: ''
});

const valid = ref(false);
const props = defineProps({
  btnloading: Boolean,
  editMode: Boolean,
  formData: Object
});

const emit = defineEmits(['addItem', 'resetForm']);

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
      form.name = props.formData.name;
      form.deskripsi = props.formData.deskripsi;
    } else {
      form.name = '';
      form.deskripsi = '';
    }
  },
  { immediate: true }
);
</script>
