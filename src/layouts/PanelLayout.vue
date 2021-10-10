<style lang="scss" scoped>
.layout-root {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.layout-mainfield {
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.layout-sidepanel {
  width: 25%;
  height: 100%;
  z-index: 2;
}

.layout-sidepanel-open {
  @extend .layout-sidepanel;
}

.layout-shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 1;
  visibility: hidden;
  display: none;
}

.layout-shade-show {
  @extend .layout-shade;
}

.layout-navbar {
  width: 100%;
}

.layout-content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .layout-sidepanel {
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    transition: 320ms ease-out;
    transform: translateX(-100%);
  }

  .layout-sidepanel-open {
    transform: translateX(0);
  }

  .layout-shade-show {
    visibility: visible;
    display: inline;
  }
}
</style>

<template>
  <div class="layout-root">
    <sidepanel :class="sidepanelClass" :items="sidebarItems" />
    <div class="layout-mainfield">
      <navbar class="layout-navbar" :onMenuClick="handleMenuClick" />
      <div class="layout-content">
        <slot />
      </div>
    </div>
    <div :class="shadeClass" @click="handleShadeClick" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidepanel from "../components/Sidepanel.vue";
import Navbar from "../components/PanelNavbar.vue";
import adminSidebar from "../sidebar/admin";
import mentorSidebar from "../sidebar/mentor";
import studentSidebar from "../sidebar/student";
import { getAccount } from "../api/AccountAPI";

declare type SidepanelItemModel = import("../models/SidepanelItemModel").default;

export default Vue.extend({
  name: "layout-panel",
  components: {
    Sidepanel,
    Navbar
  },
  data() {
    return {
      sidepanelClass: "layout-sidepanel",
      shadeClass: "layout-shade"
    };
  },
  computed: {
    sidebarItems(): SidepanelItemModel[] {
      const account = getAccount();
      if (account) {
        switch (account.role) {
          case "admin":
            return adminSidebar;
          case "mentor":
            return mentorSidebar;
          case "student":
            return studentSidebar;
        }
      }
      return [];
    }
  },
  methods: {
    handleMenuClick(): void {
      this.sidepanelClass = "layout-sidepanel-open";
      this.shadeClass = "layout-shade-show";
    },
    handleShadeClick(): void {
      this.sidepanelClass = "layout-sidepanel";
      this.shadeClass = "layout-shade";
    }
  }
});
</script>
