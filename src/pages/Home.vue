<style lang="scss"></style>

<template>
  <layout>
    <h1>This is homepage</h1>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import StudentLayout from "../layouts/StudentLayout.vue";
import GuestMiddleware from "../middleware/GuestMiddleware";

export default Vue.extend({
  components: {
    layout: StudentLayout
  },
  beforeRouteEnter: GuestMiddleware
});
</script>
