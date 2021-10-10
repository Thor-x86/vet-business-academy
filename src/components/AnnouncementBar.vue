<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
</style>

<template>
  <div class="d-block p-4 bg-warning">
    <div class="mb-2 d-flex flex-row justify-content-center align-items-center">
      <img
        src="../assets/ic_announcement.svg"
        class="icon"
        alt="Announcement"
      />
      <strong>Announcement</strong>
    </div>
    <p class="m-0">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "announcement",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>