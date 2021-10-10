<style lang="scss" scoped>
@import "../../App.scss";

.page-upperbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  padding-top: 32px;
}

.page-card {
  @extend .shadow-sm;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-card-buttons {
  margin-top: 16px;
  align-self: flex-end;
  display: flex;
  flex-direction: row;
}

.page-clickable {
  cursor: pointer;
}

@media (max-width: 767.98px) {
  .page-upperbar {
    flex-direction: column;
  }

  .page-card-buttons {
    align-self: center;
  }
}
</style>

<template>
  <layout>
    <div class="container">
      <div class="page-upperbar">
        <h1 class="mr-0 mr-md-auto h3 mb-0">Course Details</h1>
        <router-link
          to="/admin/course/create"
          class="btn btn-primary mt-2 mt-md-0 ml-0 ml-sm-2"
        >
          Add Course
        </router-link>
        <router-link
          to="/admin/course/all"
          class="btn btn-secondary mt-2 mt-md-0 ml-0 ml-sm-2"
        >
          All Courses
        </router-link>
      </div>
      <div class="page-card">
        <keyvaluelist :items="info" />
        <div class="page-card-buttons">
          <router-link :to="$route.path + '/edit'" class="btn btn-primary mr-2">
            Edit Course Detail
          </router-link>
        </div>
      </div>
      <div class="d-flex flex-column my-4">
        <div class="d-flex flex-row align-items-center mb-2 py-2 underline">
          <h2 class="h5 mr-auto">Material</h2>
          <router-link
            :to="$route.path + '/material/create'"
            class="btn btn-primary"
          >
            Add Material
          </router-link>
        </div>
        <table
          class="w-100 table table-bordered table-hover shadow-sm bg-white"
        >
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Material</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(eachMaterial, index) in materialsTable"
              :key="'material-' + index"
            >
              <th
                class="page-clickable"
                style="width: 42px"
                @click="selectMaterial(eachMaterial.id)"
              >
                {{ index + 1 }}
              </th>
              <td
                class="page-clickable"
                @click="selectMaterial(eachMaterial.id)"
              >
                {{ eachMaterial.name }}
              </td>
              <td class="text-center" style="width: 25%">
                <span
                  @click="editMaterial(eachMaterial.id)"
                  class="page-clickable text-secondary"
                >
                  Edit
                </span>
                <span
                  @click="deleteMaterial(eachMaterial.id)"
                  class="page-clickable text-danger ml-0 ml-md-1"
                >
                  Delete
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import KeyValueList from "../../components/KeyValueList.vue";
import { getCourseByID } from "../../api/CourseAPI";
import { getMaterialsByCourseID } from "../../api/CourseMaterialAPI";

declare type CourseModel = import("../../models/CourseModel").default;
declare type MaterialModel = import("../../models/CourseMaterialModel").default;

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    keyvaluelist: KeyValueList,
  },
  computed: {
    courseID(): number {
      return Number.parseInt(this.$route.params["id"]);
    },
    course(): CourseModel | null {
      const result = getCourseByID(this.courseID);
      if (result == null) {
        this.$router.back();
        return null;
      }
      return result;
    },
    info(): Object {
      const course = this.course;
      if (course == null) return {};
      let result: any = {
        "Course Name": course.name,
        Category: course.category,
        "Course Description": course.description,
      };
      for (let i = 0; i < course.mentors.length; i++) {
        const number = i + 1;
        const eachMentor = course.mentors[i];
        result["Mentor " + number] = eachMentor;
      }
      return result;
    },
    materialsTable(): Object[] {
      const materials = getMaterialsByCourseID(this.courseID);
      let results: Object[] = [];
      for (let i = 0; i < materials.length; i++) {
        const eachMaterial = materials[i];
        results.push({
          id: eachMaterial.id,
          name: eachMaterial.title,
        });
      }
      return results;
    },
  },
  methods: {
    selectMaterial(id: number): void {
      const currentPath = this.$route.path;
      this.$router.push(currentPath + "/material/" + id);
    },
    editMaterial(id: number): void {
      const currentPath = this.$route.path;
      this.$router.push(currentPath + "/material/" + id + "/edit");
    },
    deleteMaterial(id: number): void {
      console.log("Delete: " + id);
    },
  },
});
</script>
