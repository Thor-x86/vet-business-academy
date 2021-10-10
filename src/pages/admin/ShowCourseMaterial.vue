<style lang="scss" scoped>
@import "../../App.scss";

.page-card {
  @extend .p-4, .bg-white, .shadow-sm;
}

.page-flex {
  @extend .d-flex, .flex-row, .flex-wrap, .mt-2;
}

.page-flex-item {
  @extend .px-2, .py-1, .mt-2, .mr-2;
}

.page-attachment-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>

<template>
  <layout>
    <div class="container">
      <h1 class="w-100 mt-4 pt-4 h3">Material Details</h1>
      <div class="page-card my-4 d-flex flex-column">
        <keyvaluelist :items="info" />
        <div class="page-flex">
          <div
            v-for="(eachCategory, index) in material.categories"
            :key="index"
            class="page-flex-item bg-primary text-white"
          >
            {{ eachCategory }}
          </div>
        </div>
      </div>
      <gallery class="mb-4" :items="material.videos" isVideo />
      <gallery class="mb-4" :items="material.pictures" />
      <div class="page-flex">
        <a
          v-for="(eachAttachment, index) in material.attachments"
          :key="index"
          class="btn btn-secondary page-flex-item text-white d-flex flex-row"
          href="_blank"
          :download="eachAttachment"
        >
          <img
            src="../../assets/ic_attachment.svg"
            class="page-attachment-icon"
            :alt="eachAttachment"
          />
          <div>{{ eachAttachment }}</div>
        </a>
      </div>
      <div class="page-card mt-2 mb-4 p-4" v-html="material.content" />
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import KeyValueList from "../../components/KeyValueList.vue";
import Gallery from "../../components/Gallery.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import { getMaterialByID } from "../../api/CourseMaterialAPI";

declare type MaterialModel = import("../../models/CourseMaterialModel").default;

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    keyvaluelist: KeyValueList,
    gallery: Gallery,
  },
  computed: {
    materialID(): number {
      return Number.parseInt(this.$route.params["material_id"]);
    },
    material(): MaterialModel | null {
      const result = getMaterialByID(this.materialID);
      if (result == null) {
        this.$router.back();
        return null;
      }
      return result;
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
