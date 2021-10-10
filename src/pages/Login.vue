<style lang="scss" scoped>
@import "../App.scss";

.page-container {
  width: 100%;
  height: 50vh;
  margin-top: 20vh;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.page-logo {
  width: 100%;
  height: 100%;
}

.page-logo-m {
  width: 0;
  height: 0;
  margin: 0;
}

.page-vline {
  width: 2px;
  height: 100%;
  background-color: $primary;
  margin-left: 16px;
  margin-right: 16px;
}

.page-form {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-clickable {
  cursor: pointer;
}

@media (max-width: 767.98px) {
  .page-container {
    height: 100%;
    margin-top: 0;
    overflow-y: auto;
  }

  .page-logo,
  .page-vline {
    width: 0;
    padding: 0;
    margin: 0;
    visibility: collapse;
  }

  .page-form {
    overflow-y: visible;
    justify-content: start;
  }

  .page-logo-m {
    width: 100%;
    height: 150px;
    margin-bottom: 32px;
  }
}
</style>

<template>
  <layout>
    <div class="page-container">
      <img
        class="page-logo"
        src="../assets/logo.svg"
        alt="Welcome to Vet Business Academy"
      />
      <div class="page-vline" />
      <div class="page-form">
        <img
          class="page-logo-m"
          src="../assets/logo.svg"
          alt="Welcome to Vet Business Academy"
        />
        <p class="mb-2">
          <i>To access this e-learning, you must login first.</i>
        </p>
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
        <router-link to="/forgot-password" tabindex="-1">
          <i>Forgot your password?</i>
        </router-link>
        <div class="form-check my-2">
          <input
            class="form-check-input page-clickable"
            type="checkbox"
            value=""
            id="remember"
            tabindex="-1"
          />
          <label
            class="form-check-label page-clickable"
            for="remember"
            tabindex="-1"
          >
            Remember Me
          </label>
        </div>
        <button
          class="btn btn-primary align-self-center my-4"
          @click="onSubmit"
        >
          LOGIN
        </button>
        <div class="align-self-center">
          Don't have account?
          <router-link to="/register">Sign-up here</router-link>.
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import StudentLayout from "../layouts/StudentLayout.vue";
import GuestMiddleware from "../middleware/GuestMiddleware";
import { login } from "../api/AccountAPI";

export default Vue.extend({
  beforeRouteEnter: GuestMiddleware,
  components: {
    layout: StudentLayout
  },
  data() {
    return {
      email: "student@example.com",
      password: "123456"
    };
  },
  methods: {
    onSubmit() {
      if (this.email.trim().length === 0) {
        alert("Email is required");
      } else if (this.password.length === 0) {
        alert("Password is required");
      } else if (login(this.email.trim(), this.password)) {
        this.$router.push("/dashboard");
      } else {
        alert("Email and Password are mismatch");
      }
    }
  }
});
</script>
