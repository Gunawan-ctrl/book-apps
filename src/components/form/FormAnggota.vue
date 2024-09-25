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
              <div>Nama Lengkap</div>
              <VTextField v-model="form.nama_lengkap" placeholder="Nama lengkap" />
              <div>Email</div>
              <VTextField v-model="form.email" required placeholder="Email" :rules="[(v) => !!v || 'This field is required']" />
              <div>Alamat</div>
              <VTextField v-model="form.alamat" required placeholder="Alamat" :rules="[(v) => !!v || 'This field is required']" />
              <div>Username</div>
              <VTextField v-model="form.username" required placeholder="Username" :rules="[(v) => !!v || 'This field is required']" />
              <div>Password</div>
              <VTextField v-model="form.password" required placeholder="Password" :rules="[(v) => !!v || 'This field is required']" />
              <div>Level</div>
              <v-select
                v-model="form.level"
                :items="[
                  { value: 1, text: 'Admin' },
                  { value: 2, text: 'Petugas' },
                  { value: 3, text: 'Peminjam' }
                ]"
                item-title="text"
                item-value="value"
                variant="outlined"
              ></v-select>
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
  nama_lengkap: '',
  email: '',
  alamat: '',
  username: '',
  password: '',
  level: 1
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
      form.nama_lengkap = props.formData.nama_lengkap;
      form.email = props.formData.email;
      form.alamat = props.formData.alamat;
      form.username = props.formData.username;
      form.password = props.formData.password;
      form.level = props.formData.level;
    } else {
      (form.nama_lengkap = ''), (form.email = ''), (form.alamat = ''), (form.username = ''), (form.password = ''), (form.level = '');
    }
  },
  { immediate: true }
);
</script>
