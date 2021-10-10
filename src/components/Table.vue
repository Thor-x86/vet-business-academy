<style lang="scss" scoped>
.table-clickable {
  cursor: pointer;
}
</style>

<template>
  <table :class="rootClass">
    <thead>
      <tr>
        <th v-for="(eachHead, index) in heads" :key="index" scope="col">
          {{ eachHead }}
        </th>
      </tr>
    </thead>
    <tbody v-if="onRowSelect">
      <tr
        v-for="(eachRow, index) in data"
        :key="index"
        class="table-clickable"
        @click="() => onRowSelect(eachRow, index)"
      >
        <td v-for="(value, key) in eachRow" :key="index + '-' + key">
          {{ value }}
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="(eachRow, index) in data" :key="index">
        <td v-for="(value, key) in eachRow" :key="index + '-' + key">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    data: {
      type: Array as () => { [key: string]: any }[],
      required: true
    },
    tableClass: {
      type: String,
      required: false
    },
    onRowSelect: {
      type: Function,
      required: false
    }
  },
  computed: {
    heads(): string[] {
      let result: string[] = [];
      for (let eachRow of this.data) {
        const keys = Object.keys(eachRow);
        for (let eachKey of keys) {
          if (!result.includes(eachKey)) {
            result.push(eachKey);
          }
        }
      }
      return result;
    },
    rootClass(): string {
      if (this.tableClass) {
        return this.tableClass;
      } else if (typeof this.onRowSelect === "function") {
        return "table table-hover";
      } else {
        return "table";
      }
    }
  }
});
</script>
