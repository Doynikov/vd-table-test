<template>
  <div class="main">
    <div class="v-application">
      <v-container>
        <v-row class="text-center">
          <v-col cols="12">
            <router-link to="/"> Table VD </router-link> |
            <router-link to="/vuetify"> Table vuetify </router-link>
            <h1 class="display-2 pt-10 pb-10">НАШИ ТАМ</h1>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
