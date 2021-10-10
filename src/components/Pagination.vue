<template>
  <div class="pagination w-100 justify-content-center my-4">
    <!-- Left Arrow -->
    <li :class="leftArrowClass">
      <router-link
        :to="getUrlOfPage(page - 1)"
        class="page-link"
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>
      </router-link>
    </li>
    <!-- Left Ellipsis -->
    <li v-if="showLeftEllipsis" class="page-item disabled">
      <span class="page-link" aria-hidden="true">...</span>
    </li>
    <!-- Page Items -->
    <li
      v-for="eachPage in items"
      :key="'pagination-' + eachPage"
      :class="itemClass(eachPage)"
    >
      <router-link :to="getUrlOfPage(eachPage)" class="page-link">
        {{ eachPage }}
      </router-link>
    </li>
    <!-- Right Ellipsis -->
    <li v-if="showRightEllipsis" class="page-item disabled">
      <span class="page-link" aria-hidden="true">...</span>
    </li>
    <!-- Right Arrow -->
    <li :class="rightArrowClass">
      <router-link
        :to="getUrlOfPage(page + 1)"
        class="page-link"
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
      </router-link>
    </li>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "pagination",
  props: {
    maxPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    page(): number {
      const query = this.$route.query["page"] as string;
      return Number.parseInt(query) || 1;
    },
    items(): number[] {
      if (this.maxPage < 5) {
        let result = [];
        for (let i = 1; i <= this.maxPage; i++) {
          result.push(i);
        }
        return result;
      } else if (this.page <= 3) {
        return [1, 2, 3, 4, 5];
      } else if (this.page >= this.maxPage - 2) {
        return [
          this.maxPage - 4,
          this.maxPage - 3,
          this.maxPage - 2,
          this.maxPage - 1,
          this.maxPage,
        ];
      } else {
        return [
          this.page - 2,
          this.page - 1,
          this.page,
          this.page + 1,
          this.page + 2,
        ];
      }
    },
    leftArrowClass() {
      if (this.page === 1) {
        return "page-item disabled";
      } else {
        return "page-item";
      }
    },
    rightArrowClass() {
      if (this.page === this.maxPage) {
        return "page-item disabled";
      } else {
        return "page-item";
      }
    },
    showLeftEllipsis(): boolean {
      return this.page > 3;
    },
    showRightEllipsis(): boolean {
      return this.page < this.maxPage - 2 && this.maxPage > 5;
    },
  },
  methods: {
    getUrlOfPage(page: number): string {
      return this.$route.path + "?page=" + page;
    },
    itemClass(page: number): string {
      if (page === this.page) {
        return "page-item active";
      } else {
        return "page-item";
      }
    },
  },
});
</script>
