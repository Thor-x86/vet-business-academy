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

@media (max-width: 767.98px) {
  .page-upperbar {
    flex-direction: column;
  }
}
</style>

<template>
  <layout>
    <div class="page-upperbar">
      <h1 class="mr-0 mr-sm-auto h3 mb-0">All Courses</h1>
      <router-link to="create" class="btn btn-primary mt-4 mt-sm-0">
        Add Course
      </router-link>
    </div>
    <div class="m-4 bg-white shadow-sm">
      <table-course :data="tableData" :onRowSelect="onRowSelect" />
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import Table from "../../components/Table.vue";
import { getCourses, countMaterialByID } from "../../api/CourseAPI";

declare type CourseModel = import("../../models/CourseModel").default;

let courses: CourseModel[];

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    "table-course": Table,
  },
  computed: {
    tableData(): Object[] {
      courses = getCourses();
      let result: Object[] = [];
      for (let i = 0; i < courses.length; i++) {
        const eachCourse = courses[i];
        result.push({
          "No.": i + 1,
          "Courses Name": eachCourse.name,
          Materials: countMaterialByID(eachCourse.id),
          Participants: eachCourse.participantCount,
        });
      }
      return result;
    },
  },
  methods: {
    onRowSelect(_eachRow: Object, index: number): void {
      const id = courses[index].id;
      this.$router.push("/admin/course/" + id);
    },
  },
});
</script>
