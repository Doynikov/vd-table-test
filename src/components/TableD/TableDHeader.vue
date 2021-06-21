<template>
  <th
    v-bind:style="widthStyle"
    v-on="header.sortable ? { click: handlerClick } : {}"
  >
    <slot :name="`head-${header.value}`" :header="header">
      {{ header.text }}
    </slot>

    <span
      v-if="
        header.sortable &&
        ((sortIndex == index) ||
          (sortIndex==-1 && startSortIndex == index))
      "
    >
      <i
        v-if="
          (sortOrder == 1) ||
          (sortIndex==-1 && startSortOrder == 1)
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
    sortIndex: {
      type: Number,
      default: 0,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    startSortIndex: {
      type: Number,
      default: 0,
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
      this.$emit("sort", this.index);
    },
  },
};
</script>