<template>
  <col />
</template>
<script>
export default {
  name: "table-d-col",
  props: {
    item: {
      type: Object,
      default: null
    },
    col: {
      type: Object,
      default: () => null
    }
  }
}
</script>