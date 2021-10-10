<style lang="scss" scoped>
.page-root {
  padding: 8px;
  text-align: center;
  margin-top: 21%;
}

h1 {
  margin-bottom: 16px;
}
</style>

<template>
  <div class="page-root">
    <h1>404 - Not Found</h1>
    <router-link to="/" class="btn btn-primary">Go Back Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "notfound"
});
</script>
