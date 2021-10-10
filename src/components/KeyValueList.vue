<style lang="scss" scoped>
.kvl-transparent {
  background-color: transparent;
}

.kvl-nonbreak {
  white-space: nowrap;
}
</style>

<template>
  <table>
    <body class="kvl-transparent">
      <tr v-for="(value, key) in items" :key="key" class="h6">
        <td>
          <div class="kvl-nonbreak">{{ key }}</div>
        </td>
        <td class="px-2">:</td>
        <td>{{ value }}</td>
      </tr>
    </body>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "keyvaluelist",
  props: {
    items: {
      type: Object,
      required: true
    }
  }
});
</script>
