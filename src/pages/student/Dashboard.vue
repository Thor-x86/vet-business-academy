<style lang="scss" scoped>
@import "../../App.scss";

.page-header-icon {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
</style>

<template>
  <layout>
    <announce v-if="announceMsg" :message="announceMsg" />
    <!-- Topmost button bar -->
    <div class="d-flex flex-row p-2">
      <div class="mr-auto" />
      <router-link to="/journal" class="btn btn-secondary mx-1">
        My Journal
      </router-link>
      <router-link to="/course/score" class="btn btn-secondary mx-1">
        My Score
      </router-link>
      <router-link to="/forum" class="btn btn-secondary mx-1">
        Forum Discussion
      </router-link>
    </div>
    <!-- First Row Section -->
    <div class="d-flex flex-column flex-md-row mx-4 underline">
      <!-- Active Courses -->
      <div class="w-100 mr-md-4">
        <div class="w-100 d-flex flex-row mb-4 pt-2 underline">
          <h2 class="h5 mr-auto">Active Courses</h2>
          <router-link to="/course/active"> See All </router-link>
        </div>
        <barchart :items="activeCourses" />
      </div>
      <!-- Leaderboard -->
      <div class="w-100 ml-md-4">
        <div class="w-100 d-flex flex-row mb-4 pt-2 underline">
          <h2 class="h5 mr-auto">Leaderboard</h2>
          <router-link to="/course/review"> See All </router-link>
        </div>
        <leaderboard :data="leaderboardData" />
      </div>
    </div>
    <!-- Second Row Section -->
    <div class="d-flex flex-column flex-md-row mx-4 mt-2 mb-4 underline">
      <!-- Upcoming Courses -->
      <div class="w-100 mr-md-4">
        <div
          class="w-100 d-flex flex-row mb-2 py-2 underline align-items-center"
        >
          <img
            class="page-header-icon"
            src="../../assets/ic_book_opened.svg"
            alt="Upcoming Courses"
          />
          <h2 class="h5 mr-auto pt-1">Upcoming Courses</h2>
          <router-link
            class="btn btn-secondary"
            to="/calendar?spotlight=upcoming"
          >
            Open Calendar
          </router-link>
        </div>
        <list :items="upcomingCourses" />
      </div>
      <!-- Due Assignment -->
      <div class="w-100 ml-md-4">
        <div
          class="w-100 d-flex flex-row mb-2 py-2 underline align-items-center"
        >
          <img
            class="page-header-icon"
            src="../../assets/ic_pencil_ruler.svg"
            alt="Active Courses"
          />
          <h2 class="h5 mr-auto pt-1">Active Courses</h2>
          <router-link
            class="btn btn-secondary"
            to="/calendar?spotlight=active"
          >
            Open Calendar
          </router-link>
        </div>
        <list :items="dueAssignments" />
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import PanelLayout from "../../layouts/PanelLayout.vue";
import AnnouncementBar from "../../components/AnnouncementBar.vue";
import BarChart from "../../components/BarChart.vue";
import Table from "../../components/Table.vue";
import List from "../../components/List.vue";
import StudentMiddleware from "../../middleware/StudentMiddleware";

declare type ChartItemModel = import("../../models/ChartItemModel").default;
declare type ListItemModel = import("../../models/ListItemModel").default;

const activeCourses: ChartItemModel[] = [
  {
    title: "Basic Business Management",
    value: Math.random() * 100,
    color: "#1aae9f"
  },
  {
    title: "Branding and Marketing",
    value: Math.random() * 100,
    color: "#f7c325"
  },
  {
    title: "Financial and Accounting Fundamental",
    value: Math.random() * 100,
    color: "#d3455b"
  }
];

const leaderboardData = [
  {
    Name: "1. Jaren Hammer",
    Point: "1800pts"
  },
  {
    Name: "2. Zane Mayes",
    Point: "1567pts"
  },
  {
    Name: "3. Nevaeh Cates",
    Point: "1362pts"
  },
  {
    Name: "4. Natalie Craig",
    Point: "1297pts"
  },
  {
    Name: "5. Johnny Simpson",
    Point: "998pts"
  }
];

const upcomingCourses: ListItemModel[] = [
  {
    icon: require("../../assets/ic_presentation.svg"),
    title: "Financial and Accounting Fundamental",
    subtitle: "Friday, 13th Sep 2020 15.00 WIB"
  },
  {
    icon: require("../../assets/ic_presentation.svg"),
    title: "Branding and Marketing",
    subtitle: "Saturday, 14th Sep 2020 15.00 WIB"
  },
  {
    icon: require("../../assets/ic_presentation.svg"),
    title: "Basic Business Management",
    subtitle: "Monday, 16th Sep 2020 15.00 WIB"
  }
];

const dueAssignments: ListItemModel[] = [
  {
    icon: require("../../assets/ic_checked_assignment.svg"),
    title: "Financial and Accounting Fundamental",
    subtitle: "Friday, 13th Sep 2020 15.00 WIB"
  },
  {
    icon: require("../../assets/ic_checked_assignment.svg"),
    title: "Branding and Marketing",
    subtitle: "Saturday, 14th Sep 2020 15.00 WIB"
  },
  {
    icon: require("../../assets/ic_checked_assignment.svg"),
    title: "Basic Business Management",
    subtitle: "Monday, 16th Sep 2020 15.00 WIB"
  }
];

export default Vue.extend({
  beforeRouteEnter: StudentMiddleware,
  components: {
    layout: PanelLayout,
    announce: AnnouncementBar,
    barchart: BarChart,
    leaderboard: Table,
    list: List
  },
  data() {
    return {
      announceMsg:
        "Quisque semper sed lacus mollis consequat. Nam iaculis felis ac lacinia ullamcorper. Aliquam erat volutpat. Nulla porta urna eu pharetra luctus. In efficitur eleifend ipsum, elementum luctus magna egestas nec. Sed purus enim, semper eu sagittis vitae, aliquam eget nulla. Nulla quis mi at justo volutpat tempus vel vel mi. Aenean facilisis neque eget magna auctor, sed commodo felis aliquam. Phasellus eleifend justo faucibus porttitor sollicitudin.",
      activeCourses,
      leaderboardData,
      upcomingCourses,
      dueAssignments
    };
  }
});
</script>
