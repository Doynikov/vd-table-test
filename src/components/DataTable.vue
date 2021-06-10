<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 pt-10 pb-10">НАШИ ТАМ</h1>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :url="url"
          :single-select="singleSelect"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.age`]="{ item }">
            <v-chip :color="getAgeColor(item.age)" dark>
              {{ item.age }}
            </v-chip>
          </template>

          <template v-slot:[`item.gender`]="{ item }">
            <v-icon v-if="item.gender === 'm'" color="green"
              >mdi-human-male</v-icon
            >
            <v-icon v-else color="red">mdi-human-female</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      singleSelect: false,
      headers: [],
      items: [],
      selected: [],
      url: "people.json",
      loaded: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let response = await fetch(this.url);
      if (response.status == 200) {
        const data = await response.json();
        //console.log(data)
        this.headers = data.headers;
        this.items = data.items;
        this.loaded = true;
      } else {
        this.loaded = false;
      }
    },

    getGenderIcon(gender) {
      console.log(gender, "j");
      return gender == "m" ? "mdi-human-male" : "mdi-human-female";
    },
    getAgeColor(age) {
      if (age > 60) return "red";
      else if (age > 18) return "#999";
      else return "green";
    },
  },
};
</script>