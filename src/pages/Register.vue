<style lang="scss" scoped>
@import "../App.scss";

.page-bg {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  object-fit: cover;
  opacity: 0.5;
}

.page-card {
  width: 50%;
  height: 75%;
  position: absolute;
  left: 25%;
  top: 16%;
  background-color: white;
  overflow: hidden;
}

.page-form {
  width: 80%;
  height: 100%;
  margin-left: 10%;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}

.page-title {
  width: 100%;
  text-align: center;
  color: $primary;
  margin-bottom: 8px;
}

.page-subtitle {
  width: 100%;
  text-align: center;
  color: gray;
  margin-bottom: 32px;
}

select {
  cursor: pointer;
}

@media (max-width: 767.98px) {
  .page-card {
    width: 80%;
    left: 10%;
  }

  .page-form {
    width: 100%;
    margin-left: 0;
  }
}
</style>

<template>
  <layout>
    <img src="../assets/login-bg.svg" class="page-bg" draggable="false" />
    <div class="page-card p-2 shadow">
      <div
        class="page-form d-flex flex-column align-items-center justify-content-center"
      >
        <h1 class="h2 page-title">Vet Business Academy</h1>
        <p class="page-subtitle"><i>Site Tagline</i></p>
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Name"
          v-model="name"
        />
        <input
          class="form-control mb-2"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mb-2"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <select class="form-control mb-2" v-model="nationality">
          <option value="" selected>Nationality</option>
          <!-- Nationality values here -->
        </select>
        <select class="form-control mb-2" v-model="interest">
          <option value="" selected>Interest</option>
          <!-- Nationality values here -->
        </select>
        <button class="btn btn-primary my-4" @click="onSubmit">
          Register as Student
        </button>
        <div>
          If you already have an account,
          <router-link to="/login">Login here</router-link>.
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import StudentLayout from "../layouts/StudentLayout.vue";
import GuestMiddleware from "../middleware/GuestMiddleware";

export default Vue.extend({
  beforeRouteEnter: GuestMiddleware,
  components: {
    layout: StudentLayout
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      nationality: "",
      interest: ""
    };
  },
  methods: {
    onSubmit() {
      //
    }
  }
});
</script>
