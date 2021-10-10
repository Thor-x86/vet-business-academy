<style lang="scss" scoped>
.page-root {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

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
  top: 12.5%;
  background-color: white;
  overflow: hidden;
}

.page-form {
  width: 75%;
  height: 100%;
  margin-left: 12.5%;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}

.page-logo {
  width: 100%;
  height: 200px;
}

.page-clickable {
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
  <div class="page-root">
    <img src="../../assets/login-bg.svg" class="page-bg" draggable="false" />
    <div class="page-card p-2 shadow">
      <div
        class="page-form d-flex flex-column align-items-center justify-content-center"
      >
        <img
          src="../../assets/logo.svg"
          alt="Welcome to Vet Business Acadeny"
          class="page-logo"
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
        <router-link to="/forgot-password" class="text-primary w-100 mb-2">
          Forgot your password?
        </router-link>
        <div class="form-check mb-2 align-self-start page-clickable">
          <input
            class="form-check-input page-clickable"
            type="checkbox"
            value=""
            id="remember"
          />
          <label class="form-check-label page-clickable" for="remember">
            Remember Me
          </label>
        </div>
        <button class="btn btn-primary mt-4" @click="onSubmit">
          LOGIN
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GuestMiddleware from "../../middleware/GuestMiddleware";
import { login } from "../../api/AccountAPI";

export default Vue.extend({
  beforeRouteEnter: GuestMiddleware,
  data() {
    return {
      email: "admin@vba.com",
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
        this.$router.push("/admin/dashboard");
      } else {
        alert("Email and Password are mismatch");
      }
    }
  }
});
</script>
