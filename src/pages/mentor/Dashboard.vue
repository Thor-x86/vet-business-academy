<style lang="scss" scoped>
@import "../../App.scss";

.page-upperbar {
  @extend .d-flex, .align-items-center, .p-4, .mt-4;
  flex-direction: row;
}

.page-iconbtn {
  @extend .btn, .d-flex, .flex-row, .align-items-center;
}

.page-table {
  width: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 16px;
}

@media (max-width: 767.98px) {
  .page-upperbar {
    flex-direction: column;
  }
}
</style>

<template>
  <layout>
    <div class="page-upperbar">
      <div class="h5 mb-4 mb-md-0 mr-0 mr-md-auto">Hello, {{ fullname }}!</div>
      <router-link
        to="/mentor/course/create"
        class="page-iconbtn btn-primary ml-0 ml-md-2 mt-2 mt-md-0"
      >
        Add Material
      </router-link>
      <router-link
        to="/mentor/assignment/create"
        class="page-iconbtn btn-primary ml-0 ml-md-2 mt-2 mt-md-0"
      >
        Add Assignment
      </router-link>
      <router-link
        to="/mentor/quiz/create"
        class="page-iconbtn btn-secondary ml-0 ml-md-2 mt-2 mt-md-0"
      >
        Create Quiz
      </router-link>
    </div>
    <grid :items="gridItems" class="px-4 pb-4" />
    <div class="d-flex flex-row align-items-center mx-4 my-2 py-2 underline">
      <div class="mr-auto h5 mb-0">Grade Assignment</div>
      <router-link to="/mentor/assignment/grade" class="btn btn-primary">
        SEE ALL
      </router-link>
    </div>
    <div class="mx-4 pb-2 mb-4 underline text-center">
      No assignment has to be graded.
    </div>
    <div
      class="d-flex flex-row align-items-center mt-4 mx-4 my-2 py-2 underline"
    >
      <div class="mr-auto h5 mb-0">In-class Forum</div>
      <router-link to="/mentor/forum" class="btn btn-primary">
        SEE ALL
      </router-link>
    </div>
    <div class="page-table">
      <apptable
        :data="tableData"
        :onRowSelect="() => {}"
        class="p-2 underline"
      />
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import MentorMiddleware from "../../middleware/MentorMiddleware";
import { getAccount } from "../../api/AccountAPI";
import Grid from "../../components/Grid.vue";
import Table from "../../components/Table.vue";

declare type GridItemModel = import("../../models/GridItemModel").default;

const gridItems: GridItemModel[] = [
  {
    value: 5 + Math.round(Math.random() * 25),
    label: "Material Added",
    icon: require("../../assets/ic_book_opened.svg")
  },
  {
    value: 2 + Math.round(Math.random() * 18),
    label: "Assignment Added",
    icon: require("../../assets/ic_checked_assignment.svg")
  },
  {
    value: 5 + Math.round(Math.random() * 15),
    label: "Quiz Added",
    icon: require("../../assets/ic_presentation.svg")
  }
];

const tableData = [
  {
    "Courses Topic": "Basic Business Development",
    "Subject Discussion": "Lorem ipsum dolor amet",
    "Post by": "Rizky Ramadhan"
  },
  {
    "Courses Topic": "Brand and Marketing",
    "Subject Discussion": "Lorem ipsum dolor amet",
    "Post by": "Raya Adhani"
  },
  {
    "Courses Topic": "Financial and Accounting",
    "Subject Discussion": "Lorem ipsum dolor amet",
    "Post by": "Tsaqova Muhammad"
  }
];

export default Vue.extend({
  beforeRouteEnter: MentorMiddleware,
  components: {
    layout: Layout,
    grid: Grid,
    apptable: Table
  },
  data() {
    return {
      gridItems,
      tableData
    };
  },
  computed: {
    fullname(): string {
      const account = getAccount();
      if (account) {
        return account.firstName + " " + account.lastName;
      } else {
        return "Guest";
      }
    }
  }
});
</script>
