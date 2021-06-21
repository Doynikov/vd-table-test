<template>
  <table>
    <template v-for="(col, index) in headers">
      <TableDCol :key="index" :col="col" :index="index"> </TableDCol>
    </template>

    <thead v-if="hasHeaders && showHeader" class="v-data-table-header">
      <tr>
        <template v-if="showSelect">
          <TableDHeaderSelect 
            :update="update"
            :is-select-all="isSelectAll"
            v-on:do-select-all="doSelectAll"
          >
          </TableDHeaderSelect>
        </template>
        <template v-for="(header, index) in headers">
          <TableDHeader
            :key="index"
            :header="header"
            :index="index"
            :sort-column.sync="sortColumn"
            :sort-order.sync="sortOrder"
            :start-sort-column.sync="startSortColumn"
            :start-sort-order.sync="startSortOrder"            
            v-on:sort="sort"
          >
            <template v-slot:[`head-${header.value}`]="data">
              <slot :name="`head-${header.value}`" v-bind="data"> </slot>
            </template>
          </TableDHeader>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="hasItems">
        <tr v-for="(item, index) in sortedItems" :key="index">
          <template v-if="showSelect">
            <TableDCellSelect
              :update="update"
              :index="index"
              :items="sortedItems"
              v-on:do-select="doSelect"
            >
            </TableDCellSelect>
          </template>

          <template v-for="(header, index) in headers">
            <TableDCell :key="index" :item="item" :header="header">
              <template
                v-if="header.value == 'age'"
                v-slot:[`cell-${header.value}`]="data"
              >
                <slot
                  :name="`cell-${header.value}`"
                  v-bind="data"                  
                >
                  <v-chip :color="getAgeColor(item[header.value])" dark>
                    {{ item[header.value] }}
                  </v-chip>
                </slot>
              </template>
              <template
                v-else-if="header.value == 'gender'"
                v-slot:[`cell-${header.value}`]="data"
              >
                <slot
                  :name="`cell-${header.value}`"
                  v-bind="data"
                >
                  <i
                    v-if="item.gender === 'm'"
                    class="
                      v-icon
                      notranslate
                      mdi mdi-human-male
                      theme--light
                      green--text
                    "
                  ></i>
                  <i
                    v-else
                    class="
                      v-icon
                      notranslate
                      mdi mdi-human-female
                      theme--light
                      red--text
                    "
                  ></i>
                </slot>
              </template>
              <template
                v-else-if="header.value == 'surname'"
                v-slot:[`cell-${header.value}`]="data"
              >
                <slot
                  :name="`cell-${header.value}`"
                  v-bind="data"                  
                >
                <span v-html="setSurname(item[header.value])"></span>
                
                </slot>
              </template>

            </TableDCell>
          </template>
        </tr>
      </template>
      <tr v-else>
        <td :colspan="colspan">Данные отсутствуют</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import TableDCol from "./TableDCol.vue";
import TableDHeader from "./TableDHeader.vue";
import TableDHeaderSelect from "./TableDHeaderSelect.vue";
import TableDCell from "./TableDCell.vue";
import TableDCellSelect from "./TableDCellSelect.vue";

export default {
  name: "TableD",
  components: {
    TableDCol,
    TableDHeader,
    TableDHeaderSelect,
    TableDCell,
    TableDCellSelect,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    startSortColumn: {
      type: String,
      default: '',
    },
    startSortOrder: {
      type: Number,
      default: 0,
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      update: false,
      sortColumn: "",
      sortOrder: 0,
      isSelectAll: false
    };
  },
  computed: {
    hasHeaders() {
      //console.log(this.hasItems.length)
      return this.headers && this.headers.length > 0;
    },
    hasItems() {
      return this.items.length > 0;
    },

    sortedItems: function () {
      let items = this.items;
      if (!this.hasHeaders) {
        return items;
      }
      let sortColumn, sortOrder;
      if (this.sortColumn!='') {
        sortColumn = this.sortColumn;
        sortOrder = this.sortOrder;
      } else {
        sortColumn = this.startSortColumn;
        sortOrder = this.startSortOrder;
      }
      let headers = this.headers;

//console.log(sortColumn,'5555555555')      
      let header=headers.find(h=>h.value==sortColumn)

//console.log(header.value,'6666')

    if (sortColumn!='') {
        items = items.slice().sort(function (a, b) {
          a = a[header.value];
          b = b[header.value];
          return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
        });
      }
      return items;
    },
  },
  methods: {
    sort: function (column) {
      if (this.sortColumn == column) {
        this.sortOrder = this.sortOrder < 1 ? 1 : -1;
      } else {
        this.sortOrder = 1;
      }
      this.sortColumn = column;      
    },
    doSelectAll: function () {
      this.isSelectAll = !this.isSelectAll;
      this.update = !this.update;
      for (let i = 0; i < this.sortedItems.length; i++) {
        this.sortedItems[i].selected = this.isSelectAll;
      }
    },
    doSelect: function (index) {     
      this.sortedItems[index].selected = !this.sortedItems[index].selected;
      this.isSelectAll = false;
      this.update = !this.update;
    },
    getAgeColor(age) {
      if (age > 60) return "red";
      else if (age > 18) return "#999";
      else return "green";
    },
    setSurname(val) {
      if(val=='Боширов') val='<strong style="color: red">' + val.toUpperCase() + '</strong>'
      return val;
    },

    remove() {
      //this.$emit('remove')
    },

    /*    
    handlerOrder(order) {
      const newOrder = order == 'desc' ? 'asc' : 'desc'
      this.$emit('order', newOrder)
    },
*/
  },
};
</script>