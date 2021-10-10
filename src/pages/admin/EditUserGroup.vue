<style lang="scss" scoped>
@import "../../App.scss";

.page-card {
  @extend .shadow-sm;
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 32px;
  margin-top: 16px;
  margin-left: 20%;
  margin-right: 20%;
  background-color: white;
  box-sizing: border-box;
}

.page-row {
  padding-right: 32px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.page-row-dynamic {
  margin-bottom: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.page-btn-circle {
  @extend .btn, .btn-light, .shadow-sm;
  padding: 4px;
  width: 48px;
  height: 48px;
  margin-left: 8px;
  margin-right: -24px;
  border-radius: 48px;
}

.page-foot {
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

@media (max-width: 767.98px) {
  .page-card {
    margin-left: 16px;
    margin-right: 16px;
  }
}
</style>

<template>
  <layout>
    <!-- Title -->
    <h1 v-if="isEdit" class="h3 mt-4 text-center">
      Manage Group
    </h1>
    <h1 v-else class="h3 mt-4 text-center">
      Create New Group
    </h1>
    <!-- Card -->
    <div class="page-card">
      <!-- Group Name -->
      <div class="page-row">
        <input
          class="form-control"
          type="text"
          placeholder="Group Name..."
          v-model="groupName"
        />
      </div>
      <!-- Group Description -->
      <div class="page-row">
        <textarea
          class="form-control"
          placeholder="Group Description..."
          v-model="groupDesc"
        />
      </div>
      <!-- Category -->
      <div class="page-row">
        <select class="custom-select" v-model="groupCategory">
          <option v-if="!isEdit" selected value="">
            Category...
          </option>
          <option
            v-for="(eachCategory, index) in availableCategories"
            :key="'categories-' + index"
            :value="eachCategory"
            :selected="eachCategory === groupCategory"
          >
            {{ eachCategory }}
          </option>
        </select>
      </div>
      <!-- Mentors -->
      <div class="mt-4 h5">
        Mentors:
      </div>
      <div
        v-for="(eachMentor, index) in mentors"
        :key="'mentor-' + index"
        class="page-row-dynamic"
      >
        <input
          class="form-control"
          type="text"
          placeholder="Mentor Name..."
          v-model="mentors[index]"
        />
        <img
          class="page-btn-circle"
          src="../../assets/ic_remove.svg"
          alt="Remove this mentor textfield"
          @click="() => removeMentor(index)"
        />
      </div>
      <div class="page-row-dynamic">
        <input
          class="form-control"
          type="text"
          placeholder="Mentor Name..."
          disabled
        />
        <img
          class="page-btn-circle"
          src="../../assets/ic_add.svg"
          alt="Add more mentor textfield"
          @click="addMentor"
        />
      </div>
      <!-- Participants -->
      <div class="mt-4 h5">
        Participants:
      </div>
      <div
        v-for="(eachParticipant, index) in participants"
        :key="'participant-' + index"
        class="page-row-dynamic"
      >
        <input
          class="form-control"
          type="text"
          placeholder="Participant Name..."
          v-model="participants[index]"
        />
        <img
          class="page-btn-circle"
          src="../../assets/ic_remove.svg"
          alt="Remove this participant textfield"
          @click="() => removeParticipant(index)"
        />
      </div>
      <div class="page-row-dynamic">
        <input
          class="form-control"
          type="text"
          placeholder="Participant Name..."
          disabled
        />
        <img
          class="page-btn-circle"
          src="../../assets/ic_add.svg"
          alt="Add more participant textfield"
          @click="addParticipant"
        />
      </div>
    </div>
    <div class="page-foot">
      <button class="btn btn-secondary btn-lg" @click="submit">
        SUBMIT
      </button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "../../layouts/PanelLayout.vue";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import {
  getByID,
  create,
  update,
  categories as availableCategories
} from "../../api/GroupAPI";

declare type GroupModel = import("../../models/GroupModel").default;

interface ComponentDataModel {
  target: GroupModel | null;
  groupName: string;
  groupDesc: string;
  groupCategory: string;
  mentors: string[];
  participants: string[];
  availableCategories: string[];
}

export default Vue.extend({
  beforeRouteEnter: AdminMiddleware,
  components: {
    layout: Layout
  },
  data(): ComponentDataModel {
    const id = Number.parseInt(this.$route.params["id"]);
    const groupTarget = getByID(id);
    if (groupTarget != null) {
      return {
        target: groupTarget,
        groupName: groupTarget.name,
        groupDesc: groupTarget.description,
        groupCategory: groupTarget.category,
        mentors: groupTarget.mentors,
        participants: groupTarget.participants,
        availableCategories
      };
    } else {
      return {
        target: null,
        groupName: "",
        groupDesc: "",
        groupCategory: "",
        mentors: [],
        participants: [],
        availableCategories
      };
    }
  },
  methods: {
    addMentor(): void {
      this.mentors.push("");
    },
    removeMentor(index: number): void {
      this.mentors.splice(index, 1);
    },
    addParticipant(): void {
      this.participants.push("");
    },
    removeParticipant(index: number): void {
      this.participants.splice(index, 1);
    },
    validateForm(): boolean {
      this.groupName = this.groupName.trim();
      if (this.groupName.length === 0) {
        alert("Group name is required");
        return false;
      }

      this.groupDesc = this.groupDesc.trim();
      if (this.groupDesc.length === 0) {
        alert("Group description is required");
        return false;
      }

      if (this.groupCategory.length === 0) {
        alert("Please choose the category");
        return false;
      }

      if (this.mentors.length === 0) {
        alert("At least 1 mentor for each group");
        return false;
      }

      for (let eachMentor of this.mentors) {
        if (eachMentor.trim().length === 0) {
          alert("Make sure all mentor names are filled");
          return false;
        }
      }

      if (this.mentors.length === 0) {
        alert("At least 1 mentor for each group");
        return false;
      }

      for (let eachMentor of this.mentors) {
        if (eachMentor.trim().length === 0) {
          alert("Make sure all mentor names are filled");
          return false;
        }
      }

      if (this.participants.length === 0) {
        alert("At least 1 participant for each group");
        return false;
      }

      for (let eachParticipant of this.participants) {
        if (eachParticipant.trim().length === 0) {
          alert("Make sure all participant names are filled");
          return false;
        }
      }

      return true;
    },
    submit(): void {
      if (this.validateForm()) {
        const group: GroupModel = {
          id: 0,
          name: this.groupName,
          description: this.groupDesc,
          category: this.groupCategory,
          mentors: this.mentors,
          participants: this.participants
        };
        if (this.target) {
          group.id = this.target.id;
          update(group);
          this.$router.back();
        } else {
          create(group);
          this.$router.back();
        }
      }
    }
  },
  computed: {
    isEdit(): boolean {
      return this.target != null;
    }
  }
});
</script>
