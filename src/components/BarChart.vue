<style lang="scss" scoped>
.bar-bg {
  width: 100%;
  height: 24px;
  background-color: lightgray;
}
.bar-value {
  width: 48px;
  height: 24px;
  margin-left: 8px;
  text-align: right;
}
</style>

<template>
  <div class="w-100 d-flex flex-column mb-4">
    <div
      v-for="(eachItem, index) in items"
      :key="index"
      class="w-100 d-flex flex-column mb-2"
    >
      <div>
        <b>{{ eachItem.title }}</b>
      </div>
      <div class="w-100 d-flex flex-row">
        <div class="bar-bg">
          <div
            :style="{
              width: Math.min(eachItem.value, 100) + '%',
              height: '100%',
              'background-color': eachItem.color,
            }"
          />
        </div>
        <div class="bar-value">
          {{ Math.min(Math.round(eachItem.value), 100) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

declare type ItemModel = import("../models/ChartItemModel").default;

export default Vue.extend({
  name: "barchart",
  props: {
    items: {
      type: Array as () => ItemModel[],
      required: true,
    },
  },
});
</script>