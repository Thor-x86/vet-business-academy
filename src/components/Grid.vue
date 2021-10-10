<style lang="scss" scoped>
@import "../App.scss";

.grid-root {
  box-sizing: border-box;
  padding: 8px;
  justify-content: center;
}

.grid-item {
  box-sizing: border-box;
  margin: 8px;
  padding: 32px;
  background-color: white;
  text-align: center;
  z-index: -1;
}

.grid-item-inner {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.grid-item-icon {
  min-width: 128px;
  min-height: 72px;
  max-width: 128px;
  max-height: 72px;
  margin-right: 16px;
  opacity: 0.5;
  object-position: center;
}
</style>

<template>
  <div class="row grid-root">
    <div
      v-for="(eachItem, index) in items"
      :key="index"
      class="col-12 col-md-4 col-lg-3 grid-item shadow-sm"
    >
      <div class="grid-item-inner">
        <img
          class="grid-item-icon"
          :src="eachItem.icon"
          :alt="eachItem.label"
        />
        <div class="w-100">
          <div class="h2 mb-0">{{ eachItem.value }}</div>
          <div>{{ eachItem.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

declare type ItemModel = import("../models/GridItemModel").default;

export default Vue.extend({
  name: "grid",
  props: {
    items: {
      type: Array as () => ItemModel[],
      required: true,
    },
  },
});
</script>