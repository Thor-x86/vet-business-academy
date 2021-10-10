<style lang="scss" scoped>
@import "../App.scss";

.list-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.list-subtitle {
  width: 100%;
  font-size: 0.75em;
}
</style>

<template>
  <div class="mb-2 w-100">
    <button
      v-for="(eachItem, index) in items"
      :key="index"
      class="btn btn-light p-2 text-left w-100 d-flex flex-row align-items-center"
    >
      <img
        v-if="eachItem.icon"
        class="list-icon"
        :src="eachItem.icon"
        :alt="eachItem.title"
      />
      <div class="w-100">
        <div class="w-100">{{ eachItem.title }}</div>
        <div v-if="eachItem.subtitle" class="list-subtitle">
          {{ eachItem.subtitle }}
        </div>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

declare type ItemModel = import("../models/ListItemModel").default;

export default Vue.extend({
  name: "list",
  props: {
    items: {
      type: Array as () => ItemModel[],
      required: true,
    },
  },
});
</script>