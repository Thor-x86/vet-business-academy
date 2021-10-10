<style lang="scss" scoped>
@import "../../App.scss";

.page-upperbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
}
</style>

<template>
  <layout></layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
  },
  mounted() {
    this.$router.back(); // TODO: Remove placeholder
  },
});
</script>
