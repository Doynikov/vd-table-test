<template>
    <td :class="
            header.cls
              ? header.cls
              : ''
          "> 
      <slot :name="`cell-${header.value}`" :item="item" :header="header.value">
        {{ item[header.value] }}
      </slot>
    </td>
</template>
<script>
export default {
  name: "table-d-cell",
  props: {
    item: {
      type: Object,
      default: null
    },
    header: {
      type: Object,
      default: () => null
    }
  }
}
</script>