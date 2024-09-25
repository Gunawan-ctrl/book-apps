<script setup>
import CardImage from '@/components/card/CardImage.vue';
</script>

<template>
  <v-row>
    <v-col>
      <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="380">
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h4 font-weight-thin mb-4">Vuetify</h1>
          <h4 class="subheading">Build your application today!</h4>
        </div>
      </v-parallax>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="2">
      <CardImage height="250" width="250" />
    </v-col>
  </v-row>
</template>
