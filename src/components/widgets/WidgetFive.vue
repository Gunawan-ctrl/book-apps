<script setup>
defineProps({
  fivecards: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <v-row class="my-0">
    <v-col
      cols="12"
      sm="6"
      :md="fivecards.find((item) => item.name === 'Total Anggota') ? '3' : '4'"
      v-for="(card5, i) in fivecards"
      :key="i"
      :value="card5"
    >
      <v-card elevation="0">
        <v-card variant="outlined">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1">{{ card5.name }}</h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                  {{ card5.earn }}
                </h4>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
