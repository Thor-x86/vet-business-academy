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

.page-card {
  @extend .shadow-sm;
  padding: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
  margin-left: 20%;
  margin-right: 20%;
  background-color: white;
}

@media (max-width: 767.98px) {
  .page-upperbar {
    flex-direction: column;
  }

  .page-card {
    margin-top: 0;
    margin-left: 16px;
    margin-right: 16px;
  }
}
</style>

<template>
  <layout>
    <div class="page-upperbar">
      <h1 class="mr-0 mr-sm-auto h3 mb-0">
        Group/Cohort Details
      </h1>
      <router-link
        :to="$route.path + '/edit'"
        class="btn btn-primary mt-4 mt-sm-0"
      >
        Manage this Group
      </router-link>
    </div>
    <div class="page-card">
      <keyvaluelist :items="items" />
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import KeyValueList from "../../components/KeyValueList.vue";
import { getByID } from "../../api/GroupAPI";
import AdminMiddleware from "../../middleware/AdminMiddleware";

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout,
    keyvaluelist: KeyValueList
  },
  computed: {
    items(): Object {
      const id = Number.parseInt(this.$route.params["id"]);
      const group = getByID(id);
      if (group) {
        let result: any = {
          "Group Name": group.name,
          Participants: group.participants.length,
          Mentors: group.mentors.length,
          "Group Description": group.description,
          "Group Category": group.category
        };
        for (let i = 0; i < group.mentors.length; i++) {
          const num = i + 1;
          result["Mentor " + num] = group.mentors[i];
        }
        for (let i = 0; i < group.participants.length; i++) {
          const num = i + 1;
          result["Participant " + num] = group.participants[i];
        }
        return result;
      } else {
        this.$router.back();
        return {};
      }
    }
  }
});
</script>
