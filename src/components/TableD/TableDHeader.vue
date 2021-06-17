<template>
  <th :style="`width: ${header.width ? header.width : 'auto'}`" 
    v-on="(header.sortable && sorting) ? { click: handlerClick } : {}"
  >
    {{ header.text }}
    <slot :name="`head-${header.value}`">
      <span v-if="sorting && header.sortable && (header.clickedSort && sortIndex==index || !header.clickedSort && startSortIndex==index)">
                    <i v-if="(header.clickedSort && sortOrder==1) || (!header.clickedSort && startSortOrder==1)"
                      class="v-icon notranslate v-data-table-header__icon theme--light mdi mdi-arrow-down">
                    </i>
                    <i v-else
                      class="v-icon notranslate v-data-table-header__icon theme--light mdi mdi-arrow-up">
                    </i>
      </span>
    </slot>
  </th>
</template>
<script>

export default {
  name: "table-d-header",
  props: {
    header: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    },
    sortIndex: {
      type: Number,
      default: 0
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    sorting:  {
      type: Boolean,
      default: true
    },
    startSortIndex: {
      type: Number,
      default: 0
    },
    startSortOrder: {
      type: Number,
      default: 0
    },
    sort: {
      type: String,
    }
  },
  data: function () {
    return {      
      isSelected: false,
      clickedSort: false
    };
  },

  computed: {
    hasHeader() {
      return this.header
    }
  },
  methods: {
    handlerClick() {
      this.clickedSort = true
      this.$emit('sort', this)
    }
  }
}
</script>