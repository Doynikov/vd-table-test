<template>
  <th
    v-bind:style="widthStyle"
    v-on="header.sortable ? { click: handlerClick } : {}"
  >
    <slot :name="`head-${header.value}`" :header="header">
      {{ header.text }}
    </slot>

    <span
      v-if="header.sortable && ((sortColumn == header.value) || (sortColumn=='' && startSortColumn == header.value))"
    >
      <i
        v-if="
          (sortOrder == 1) ||
          (sortColumn=='' && startSortOrder == 1)
        "
        class="
          v-icon
          notranslate
          v-data-table-header__icon
          theme--light
          mdi mdi-arrow-down
        "
      >
      </i>
      <i
        v-else
        class="
          v-icon
          notranslate
          v-data-table-header__icon
          theme--light
          mdi mdi-arrow-up
        "
      >
      </i>
    </span>
  </th>
</template>
<script>
export default {
  name: "table-d-header",
  props: {
    header: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
    sortColumn: {
      type: String,
      default: '',
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    startSortColumn: {
      type: String,
      default: '',
    },
    startSortOrder: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    hasHeader() {
      return this.header;
    },
    widthStyle: function () {
      return {
        width: this.header.width ? this.header.width : "auto",
      };
    },
  },
  methods: {
    handlerClick() {
      this.$emit("sort", this.header.value);
    },
  },
};
</script>