<style lang="scss" scoped>
@import "../App.scss";

.sidepanel-root {
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
}

.sidepanel-branding {
  width: 100%;
  height: 150px;
}

.sidepanel-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.sidepanel-label {
  width: 100%;
}

.sidepanel-arrow {
  width: 24px;
  height: 24px;
  margin-left: 8px;
}

.sidepanel-content {
  font-size: 0.75em;
  padding-top: 6px;
  padding-bottom: 3px;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>

<template>
  <div class="sidepanel-root shadow">
    <img
      class="sidepanel-branding"
      src="../assets/icon.svg"
      alt="Vet Business Academy"
    />
    <div class="text-center w-100">
      <b>Main Navigation</b>
    </div>
    <!-- Menu Items -->
    <div class="w-100 mt-4 accordion" role="tablist">
      <!-- Each Item -->
      <div
        v-for="(eachItem, itemIndex) in items"
        :key="itemIndex"
        class="w-100"
      >
        <!-- Item with Contents -->
        <div v-if="eachItem.contents">
          <!-- Header with Routing -->
          <router-link
            v-if="eachItem.route"
            :to="eachItem.route"
            class="btn btn-light w-100 text-left d-flex flex-row"
            active-class="active"
            role="tab"
            :v-b-toggle="'sidepanel-' + itemIndex + '-contents'"
          >
            <img
              v-if="eachItem.icon"
              :src="eachItem.icon"
              class="sidepanel-icon"
            />
            <div v-else class="sidepanel-icon" />
            <div class="sidepanel-label">{{ eachItem.title }}</div>
            <div class="when-opened sidepanel-arrow">
              <img
                src="../assets/ic_expand.svg"
                alt="The contents are shown, tap or click to hide."
                draggable="false"
              />
            </div>
            <div class="when-closed sidepanel-arrow">
              <img
                src="../assets/ic_more.svg"
                alt="The contents are hidden, tap or click to show."
                draggable="false"
              />
            </div>
          </router-link>
          <!-- Header without Routing -->
          <button
            v-else
            class="btn btn-light w-100 text-left d-flex flex-row"
            role="tab"
            v-b-toggle="'sidepanel-' + itemIndex + '-contents'"
          >
            <img
              v-if="eachItem.icon"
              :src="eachItem.icon"
              class="sidepanel-icon"
            />
            <div v-else class="sidepanel-icon" />
            <div class="sidepanel-label">{{ eachItem.title }}</div>
            <div class="when-opened sidepanel-arrow">
              <img
                src="../assets/ic_expand.svg"
                alt="The contents are shown, tap or click to hide."
                draggable="false"
              />
            </div>
            <div class="when-closed sidepanel-arrow">
              <img
                src="../assets/ic_more.svg"
                alt="The contents are hidden, tap or click to show."
                draggable="false"
              />
            </div>
          </button>
          <!-- Contents -->
          <b-collapse
            :id="'sidepanel-' + itemIndex + '-contents'"
            accordion="sidepanel"
            role="tabpanel"
            :visible="checkShouldExpand(eachItem)"
          >
            <!-- Each Content -->
            <router-link
              v-for="(eachContent, contentIndex) in eachItem.contents"
              :key="itemIndex + '-' + contentIndex"
              :to="eachContent.route || ''"
              class="btn btn-light w-100 text-left d-flex flex-row sidepanel-content"
              active-class="active"
            >
              <div class="sidepanel-icon" />
              <div>{{ eachContent.title }}</div>
            </router-link>
          </b-collapse>
        </div>
        <!-- Item without Contents -->
        <router-link
          v-else
          :to="eachItem.route || '#'"
          class="btn btn-light w-100 text-left d-flex flex-row"
          active-class="active"
        >
          <img
            v-if="eachItem.icon"
            :src="eachItem.icon"
            class="sidepanel-icon"
          />
          <div v-else class="sidepanel-icon" />
          <div>{{ eachItem.title }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

declare type ItemModel = import("../models/SidepanelItemModel").default;

export default Vue.extend({
  name: "sidepanel",
  props: {
    items: {
      type: Array as () => ItemModel[],
      required: true,
    },
  },
  methods: {
    checkShouldExpand(item: ItemModel): boolean {
      if (!Array.isArray(item.contents)) return false;

      for (let eachContent of item.contents) {
        if (eachContent.route)
          if (this.$route.path.startsWith(eachContent.route.trim())) {
            return true;
          }
      }

      return false;
    },
  },
});
</script>
