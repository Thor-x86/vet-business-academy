<style lang="scss" scoped>
@import "../../App.scss";

.page-tableform-transparent {
  background-color: transparent;
}

.page-tableform-nonbreak {
  white-space: nowrap;
}

.page-categories {
  @extend .d-flex, .my-2;
  flex-direction: row;
}

.page-categories-unchosen {
  @extend .form-control;
  width: 25%;
  cursor: pointer;
}

@media (max-width: 992px) {
  .page-categories-unchosen {
    width: 32%;
  }
}

@media (max-width: 767.98px) {
  .page-categories {
    flex-direction: column;
  }

  .page-categories-unchosen {
    width: 100%;
  }
}
</style>

<template>
  <layout>
    <div class="container">
      <h1 v-if="isEdit" class="w-100 mt-4 pt-4 h3">Edit Material</h1>
      <h1 v-else class="w-100 mt-4 pt-4 h3">Add Material</h1>
      <table class="w-100">
        <body class="page-tableform-transparent py-2 pr-1">
          <tr>
            <td>
              <div class="page-tableform-nonbreak h6">Title</div>
            </td>
            <td class="px-2">:</td>
            <td class="w-100">
              <input class="form-control" type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <div class="page-tableform-nonbreak h6">Description</div>
            </td>
            <td class="px-2">:</td>
            <td class="w-100">
              <textarea class="form-control"></textarea>
            </td>
          </tr>
        </body>
      </table>
      <div class="page-categories">
        <select class="page-categories-unchosen">
          <option value="" selected>Category...</option>
          <option
            v-for="(eachCategory, index) in unchosenCategories"
            :key="index"
            :value="eachCategory"
          >
            {{ eachCategory }}
          </option>
        </select>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import { categories } from "../../api/CourseAPI";
import { getMaterialByID } from "../../api/CourseMaterialAPI";

declare type MaterialModel = import("../../models/CourseMaterialModel").default;

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
  },
  data() {
    return {
      unchosenCategories: categories,
      chosenCategories: [],
    };
  },
  computed: {
    materialID(): number {
      return Number.parseInt(this.$route.params["material_id"]);
    },
    material(): MaterialModel | null {
      const result = getMaterialByID(this.materialID);
      if (result == null && this.isEdit) {
        this.$router.back();
      }
      return result;
    },
    isEdit(): boolean {
      return !isNaN(this.materialID);
    },
    info(): Object {
      const material = this.material;
      if (material == null) return {};
      return {
        Title: material.title,
        Description: material.description,
      };
    },
  },
});
</script>
