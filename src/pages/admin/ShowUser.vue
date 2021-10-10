<style lang="scss" scoped>
@import "../../App.scss";

.page-card {
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.page-card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.page-photo {
  width: 128px;
  height: 128px;
  border-radius: 128px;
  object-fit: cover;
}

.page-card-info {
  max-width: 100%;
  margin-left: 32px;
  margin-top: 0;
}

.page-card-buttons {
  margin-top: 16px;
  align-self: flex-end;
  display: flex;
  flex-direction: row;
}

.page-details {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}

@media (max-width: 767.98px) {
  .page-card-content {
    flex-direction: column;
  }

  .page-card-info {
    margin-left: 0;
    margin-top: 32px;
  }

  .page-card-buttons {
    align-self: center;
  }

  .page-details {
    flex-direction: column;
  }
}
</style>

<template>
  <layout>
    <div class="container">
      <h1 class="h3 mt-4">{{ category }} Information</h1>
      <div class="page-card shadow-sm">
        <div class="page-card-content">
          <img class="page-photo" :src="userPicture" />
          <keyvaluelist class="page-card-info" :items="userInfo" />
        </div>
        <div class="page-card-buttons">
          <router-link
            :to="$route.path + '/edit'"
            class="btn btn-secondary mr-2"
          >
            Edit Account Info
          </router-link>
          <button class="btn btn-danger">Ban this User</button>
        </div>
      </div>
      <div class="page-details">
        <div class="w-100 mb-4">
          <h2 class="h4 w-100">{{ category }} Journal</h2>
          <keyvaluelist :items="userJournal" class="w-100" />
        </div>
        <div class="w-100 mb-4">
          <h2 class="h4 w-100">Performance</h2>
          <barchart :items="userPerformance" />
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import KeyValueList from "../../components/KeyValueList.vue";
import BarChart from "../../components/BarChart.vue";
import { getByID as getStudentByID } from "../../api/StudentAPI";
import { getByID as getMentorByID } from "../../api/MentorAPI";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";

declare type StudentModel = import("../../models/StudentModel").default;
declare type MentorModel = import("../../models/MentorModel").default;
declare type ChartItemModel = import("../../models/ChartItemModel").default;

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    keyvaluelist: KeyValueList,
    barchart: BarChart,
  },
  computed: {
    category(): string {
      switch (this.$route.params.category) {
        case "student":
          return "Student";
        case "mentor":
          return "Mentor";
      }
      return "";
    },
    userID(): number {
      return Number.parseInt(this.$route.params["id"]);
    },
    userData(): StudentModel | MentorModel | null {
      let result = null;
      switch (this.$route.params.category) {
        case "student":
          result = getStudentByID(this.userID);
          break;
        case "mentor":
          result = getMentorByID(this.userID);
          break;
      }
      if (result == null) this.$router.back();
      return result;
    },
    userPicture(): string {
      const userData = this.userData;
      if (userData) {
        return userData.picture.large;
      } else {
        return "";
      }
    },
    userInfo(): Object {
      let userData;
      switch (this.$route.params.category) {
        case "student":
          userData = this.userData as StudentModel;
          if (!userData) return {};
          return {
            "First Name": userData.name.first,
            "Last Name": userData.name.last,
            "User ID": userData.id,
            Email: userData.email,
            Location: userData.location.city + ", " + userData.location.state,
            "Join Date": userData.registered.date.split("T")[0],
            Interest: userData.interest,
          };
        case "mentor":
          userData = this.userData as MentorModel;
          if (!userData) return {};
          return {
            "First Name": userData.name.first,
            "Last Name": userData.name.last,
            "User ID": userData.id,
            Email: userData.email,
            Location: userData.location.city + ", " + userData.location.state,
            "Join Date": userData.registered.date.split("T")[0],
            Rating: userData.rating + " / 5",
          };
      }
      return {};
    },
    userJournal(): Object {
      let userData;
      switch (this.$route.params.category) {
        case "student":
          userData = this.userData as StudentModel;
          if (!userData) return {};
          return {
            "Taken Courses": userData.courseTaken,
            "Completed Courses": userData.courseCompleted,
            "All Assignments": userData.assignments,
            "Submitted Assignments": userData.submittedAssignments,
            "Overdue Assignments": userData.overdueAssignments,
            "All Quizes": userData.quizes,
            "Completed Quizes": userData.completedQuizes,
            "Missed Quizes": userData.missedQuizes,
            "Total Scores": userData.totalScore,
            "Hours Spent on Courses": userData.courseHours,
            "Total Posts in Forum": userData.posts,
          };
        case "mentor":
          userData = this.userData as MentorModel;
          if (!userData) return {};
          return {
            "Courses Added": userData.courseAdded,
            "Assignments Added": userData.assignmentAdded,
            "Quizes Added": userData.quizAdded,
            "Average Courses Duration": userData.coursePlaytime + " minutes",
            "Average Assignment Score":
              userData.performaPercent.assignment + "%",
            "Average Quizes Score": userData.performaPercent.quiz + "%",
            "Total Posts in Forum": userData.posts,
          };
      }
      return {};
    },
    userPerformance(): ChartItemModel[] {
      let userData;
      switch (this.$route.params.category) {
        case "student":
          userData = this.userData as StudentModel;
          if (!userData) return [];
          return [
            {
              title: "Courses Performance",
              value: userData.performaPercent.course,
              color: "#2c88d9",
            },
            {
              title: "Assignment Performance",
              value: userData.performaPercent.assignment,
              color: "#e8833a",
            },
            {
              title: "Quizes Performance",
              value: userData.performaPercent.quiz,
              color: "#f7c325",
            },
            {
              title: "Total Score",
              value: userData.performaPercent.score,
              color: "#bd34d1",
            },
            {
              title: "Student Performance",
              value: userData.performaPercent.overall,
              color: "#d3455b",
            },
          ];
        case "mentor":
          userData = this.userData as MentorModel;
          if (!userData) return [];
          return [
            {
              title: "Courses Performance",
              value: userData.performaPercent.course,
              color: "#2c88d9",
            },
            {
              title: "Assignment Performance",
              value: userData.performaPercent.assignment,
              color: "#e8833a",
            },
            {
              title: "Quizes Performance",
              value: userData.performaPercent.quiz,
              color: "#f7c325",
            },
            {
              title: "Rating",
              value: userData.performaPercent.rating,
              color: "#bd34d1",
            },
          ];
      }
      return [];
    },
  },
});
</script>
