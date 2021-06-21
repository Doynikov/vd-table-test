<template>
  <div class="v-application">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="v-data-table elevation-1 v-data-table--has-bottom theme--light">
            <div class="v-data-table__wrapper">
              <table-d
                v-if="loaded"
                :headers="headers"
                :items="items"
                :items-per-page="itemsPerPage"
                :show-select="showSelect"
                :show-header="showHeader"
                :startSortIndex="startSortIndex"
                :startSortOrder="startSortOrder"                
              >
              </table-d>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TableD from "@/components/TableD/TableD.vue";

export default {
  components: {
    TableD,
  },
  data() {
    return {
      showSelect: true,
      showHeader: true,
      headers: [],
      items: [],
      selected: [],
      itemsPerPage: 5,
      url: "people.json",
      loaded: false,
      startSortIndex: 3,
      startSortOrder: -1
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
        this.headers = data.headers;
        this.headers[0].cls='text-right'
        this.headers[2].cls='light-gray'
        this.headers[3].cls='text-right'
        this.headers[4].cls='text-center'
        this.items = data.items;
        this.loaded = true;
      } else {
        this.loaded = false;
      }
    },
  },
  
};
</script>
<style>
.light-gray {
  background-color:#dfdfdf;
}
i.mdi-arrow-up,
i.mdi-arrow-down {
  font-size: 18px !important;
  display: inline-block !important;
  opacity: 1 !important;
}
</style>
