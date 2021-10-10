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

.page-searchbox {
  width: 50%;
}

@media (max-width: 767.98px) {
  .page-upperbar {
    flex-direction: column;
  }

  .page-searchbox {
    width: 100%;
  }
}
</style>

<template>
  <layout>
    <div class="page-upperbar">
      <h1 class="mr-0 mr-sm-auto h3 mb-0">{{ category }}</h1>
      <router-link
        :to="$route.path + '/create'"
        class="btn btn-primary mt-4 mt-sm-0"
      >
        Add {{ category }}
      </router-link>
    </div>
    <div class="px-4 w-100 d-flex justify-content-center">
      <input
        class="form-control page-searchbox"
        type="text"
        placeholder="Search by name..."
      />
    </div>
    <div class="m-4 bg-white shadow-sm">
      <userTabel :data="tableData" :onRowSelect="onRowSelect" />
    </div>
    <pagination :maxPage="maxPage" />
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import Table from "../../components/Table.vue";
import Pagination from "../../components/Pagination.vue";
import { getStudents } from "../../api/StudentAPI";
import { getMentors } from "../../api/MentorAPI";
import { getGroups } from "../../api/GroupAPI";
import AdminMiddleware from "../../middleware/AdminMiddleware";

declare type StudentModel = import("../../models/StudentModel").default;
declare type MentorModel = import("../../models/MentorModel").default;
declare type GroupModel = import("../../models/GroupModel").default;

let users: StudentModel[] | MentorModel[] | GroupModel[];

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    userTabel: Table,
    pagination: Pagination,
  },
  mounted() {
    if (this.category === "") this.$router.push("/admin/users");
  },
  data() {
    return {
      maxPage: 50,
    };
  },
  computed: {
    category(): string {
      switch (this.$route.params.category) {
        case "student":
          return "Student Information";
        case "mentor":
          return "Mentor Information";
        case "group_cohort":
          return "Group/Cohort";
      }
      return "";
    },
    page(): number {
      const query = this.$route.query["page"] as string;
      return Number.parseInt(query) || 1;
    },
    tableData(): Object[] {
      let result: Object[] = [];
      const firstNumber = (this.page - 1) * 10 + 1;
      switch (this.$route.params.category) {
        case "student":
          users = getStudents(this.page);
          for (let i = 0; i < users.length; i++) {
            const eachStudent = users[i];
            result.push({
              "No.": String(firstNumber + i),
              Name: eachStudent.name.first + " " + eachStudent.name.last,
              "Course Taken": eachStudent.courseTaken,
              Score: eachStudent.totalScore,
            });
          }
          break;
        case "mentor":
          users = getMentors(this.page);
          for (let i = 0; i < users.length; i++) {
            const eachMentor = users[i];
            result.push({
              "No.": String(firstNumber + i),
              Name: eachMentor.name.first + " " + eachMentor.name.last,
              "Course Added": eachMentor.courseAdded,
              Rating: eachMentor.rating + " / 5",
            });
          }
          break;
        case "group_cohort":
          users = getGroups(this.page);
          for (let i = 0; i < users.length; i++) {
            const eachGroup = users[i];
            result.push({
              "No.": String(firstNumber + i),
              Name: eachGroup.name,
              "Total Participants": eachGroup.participants.length,
              "Total Mentors": eachGroup.mentors.length,
            });
          }
          break;
      }
      return result;
    },
  },
  methods: {
    onRowSelect(_eachItem: Object, index: number) {
      const currentPath = this.$route.path + "/";
      const selectedData = users[index];
      this.$router.push(currentPath + selectedData.id);
    },
  },
});
</script>
