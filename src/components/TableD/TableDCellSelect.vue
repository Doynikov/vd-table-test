<template>
  <td class="text-start" :update="update" @click="doSelect(index)">
    <div class="v-data-table__checkbox v-simple-checkbox">
      <div class="v-input--selection-controls__input">
        <i
          aria-hidden="true"
          class="v-icon notranslate mdi theme--light"
          :class="
            items[index].selected
              ? ' mdi-checkbox-marked'
              : ' mdi-checkbox-blank-outline'
          "
        ></i>
        <div class="v-input--selection-controls__ripple"></div>
      </div>
    </div>
  </td>
</template>
<script>
export default {
  name: "table-d-cell-select",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    doSelect(index) {
      this.$emit("do-select", index);
    },
  },
};
</script>