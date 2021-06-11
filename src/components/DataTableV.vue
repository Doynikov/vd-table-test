<template>
  <div class="v-data-table elevation-1 v-data-table--has-bottom theme--light">
    <div class="v-data-table__wrapper">
      <table :update="update">
        <thead class="v-data-table-header">
          <tr>
            <th
              v-if="showSelect"
              role="columnheader"
              scope="col"
              aria-label=""
              class="text-start"
              style="width: 1px; min-width: 1px"
              @click="doSelectAll()"
            >
              <div class="v-data-table__checkbox v-simple-checkbox">
                <div class="v-input--selection-controls__input">
                  <i
                    aria-hidden="true"
                    :select-all="selectAll"
                    class="v-icon notranslate mdi theme--light"
                    :class="
                      selectAll
                        ? ' mdi-checkbox-marked'
                        : 'mdi-checkbox-blank-outline'
                    "
                  ></i>
                  <div class="v-input--selection-controls__ripple"></div>
                </div>
              </div>
            </th>
            <th
              v-for="(item, key) in headers"
              :key="key"
              :sort-dir="sortDir"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
            >
              {{ item.text }}
              <i
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  theme--light
                  mdi
                "
                :class="
                  sortOrders[key] > 0 ? ' mdi-arrow-up' : ' mdi-arrow-down'
                "
              >
              </i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in filteredItems" :key="key" :gender="gender">
            <td v-if="showSelect" class="text-start" @click="doSelect(key)">
              <div class="v-data-table__checkbox v-simple-checkbox">
                <div class="v-input--selection-controls__input">
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi theme--light"
                    :class="
                      filteredItems[key].selected
                        ? ' mdi-checkbox-marked'
                        : 'mdi-checkbox-blank-outline'
                    "
                  ></i>
                  <div class="v-input--selection-controls__ripple"></div>
                </div>
              </div>
            </td>
            <td v-for="(val, key) in headers" :key="key">
              <span v-if="!val.slot">{{ item[val.value] }}</span>

              <slot v-if="val.slot=='colorchip'" name="val" v-bind:val="val">
                <v-chip :color="getAgeColor(item[val.value])" dark>
                  {{ item[val.value] }}
                </v-chip>
              </slot>

              <slot v-if="val.slot=='gendericon'" name="val" v-bind:val="val">
                  {{ gender[item[val.value]] }}
              </slot>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["headers", "items", "items-per-page", "show-select"],
  data: function () {
    return {
      update: false,
      sortKey: 0,
      sortDir: 0,
      selectAll: false,
      selectedItem: [],
      sortOrders: [],
      gender: {'m': 'мужик', 'f': 'баба'}
    };
  },
  computed: {
    filteredItems: function () {
      var sortKey = parseInt(this.sortKey);
      var sortDir = parseInt(this.sortDir);
      var order = this.sortOrders[sortKey] || 1;
      var items = this.items;

      let headers = this.headers;
      let sortOrders = this.sortOrders;
      if (sortOrders.length == 0) {
        for (let i = 0; i < headers.length; i++) sortOrders[i] = 1;
      }
      if (!isNaN(sortKey) && !isNaN(sortDir)) {
        items = items.slice().sort(function (a, b) {
          a = a[headers[sortKey].value];
          b = b[headers[sortKey].value];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return items;
    },
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortDir = this.sortDir == 0 ? 1 : 0;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    doSelectAll: function () {
      this.selectAll = !this.selectAll;
      this.selectedItem = [];
      for (let i = 0; i < this.filteredItems.length; i++) {
        this.filteredItems[i].selected = this.selectAll;
        if (this.selectAll) this.selectedItem.push(this.filteredItems[i]);
      }
    },
    doSelect: function (index) {
      this.filteredItems[index].selected = !this.filteredItems[index].selected;
      this.selectAll = false;
      this.update = !this.update;
    },
    getAgeColor(age) {
      if (age > 60) return "red";
      else if (age > 18) return "#999";
      else return "green";
    },
  },
  mounted() {},
};
</script>
<style scoped>
i.mdi-arrow-up,
i.mdi-arrow-down {
  font-size: 18px;
}
</style>