<template>
  <div class="v-application">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <data-table-v
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            :show-select="showSelect"
            :sort-key="0"
            :sort-dir="0"
          >           
          </data-table-v>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DataTableV from "@/components/DataTableV.vue";

export default {
  components: {
    DataTableV,
  },
  data() {
    return {
      showSelect: true,
      headers: [],
      items: [],
      selected: [],
      itemsPerPage: 5,
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
  },
  
};
</script>