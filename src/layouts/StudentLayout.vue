<style lang="scss" scoped>
@import "../App.scss";

.layout-root {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="layout-root">
    <navbar />
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "../components/StudentNavbar.vue";

export default Vue.extend({
  name: "layout-student",
  components: {
    Navbar
  }
});
</script>
