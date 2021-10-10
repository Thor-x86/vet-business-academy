<style lang="scss" scoped>
@import "../../App.scss";

.page-upperbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  padding: 32px;
}

.page-button-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.page-create-button {
  width: 200px;
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
      <div class="mr-0 mr-sm-auto h6 mb-0">Hello, Admin!</div>
      <router-link
        to="/admin/announcement"
        class="btn btn-primary mt-4 mt-sm-0"
      >
        <img
          class="page-button-icon"
          src="../../assets/ic_announcement-invert.svg"
          alt="Create Announcement"
          draggable="false"
        />
        <span>Create Announcement</span>
      </router-link>
    </div>
    <div class="w-100 px-4">
      <grid :items="gridItems" />
    </div>
    <div
      class="w-100 p-4 d-flex flex-column flex-md-row align-items-center justify-content-center"
    >
      <barchart :items="statsData" />
      <div class="d-flex flex-column ml-0 ml-md-3 mt-2 mt-md-0">
        <router-link
          class="btn btn-primary page-create-button"
          to="/admin/course/create"
        >
          Create Course
        </router-link>
        <router-link
          class="btn btn-primary page-create-button"
          to="/admin/forum/create"
        >
          Create Forum
        </router-link>
        <router-link
          class="btn btn-secondary page-create-button"
          to="/admin/quiz/create"
        >
          Create Quiz
        </router-link>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import Grid from "../../components/Grid.vue";
import BarChart from "../../components/BarChart.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";

declare type GridItemModel = import("../../models/GridItemModel").default;
declare type ChartItemModel = import("../../models/ChartItemModel").default;

const gridItems: GridItemModel[] = [
  {
    label: "Students",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_people.svg"),
  },
  {
    label: "Courses",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_course.svg"),
  },
  {
    label: "Mentors",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_presentation.svg"),
  },
  {
    label: "Forums",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_forum.svg"),
  },
  {
    label: "Chatrooms",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_chat.svg"),
  },
  {
    label: "Questionnaire",
    value: Math.round(Math.random() * 1000),
    icon: require("../../assets/ic_questionnaire.svg"),
  },
];

const statsData: ChartItemModel[] = [
  {
    title: "Average Courses Rating",
    value: 50 + Math.random() * 50,
    color: "#f7c325",
  },
  {
    title: "Average Students Score",
    value: 50 + Math.random() * 50,
    color: "#1aae9f",
  },
  {
    title: "Average Mentors Rating",
    value: 50 + Math.random() * 50,
    color: "#d3455b",
  },
];

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    grid: Grid,
    barchart: BarChart,
  },
  data() {
    return {
      gridItems,
      statsData,
    };
  },
});
</script>
