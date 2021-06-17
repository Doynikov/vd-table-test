<template>
  <th
    :update="update"
    style="width: 1px; min-width: 1px"
    @click="doSelectAll()"
  >
    <div class="v-data-table__checkbox v-simple-checkbox">
      <div class="v-input--selection-controls__input">
        <i
          aria-hidden="true"
          :is-select-all="isSelectAll"
          class="v-icon notranslate mdi theme--light"
          :class="
            isSelectAll ? ' mdi-checkbox-marked' : ' mdi-checkbox-blank-outline'
          "
        ></i>
      </div>
    </div>
  </th>
</template>
<script>
export default {
  name: "table-d-header-select",
  props: {
    isSelectAll: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      isSelected: false,
      clickedSort: false,
    };
  },
  methods: {
    doSelectAll() {
      this.$emit("do-select-all");
    },
  },
};
</script>