<style lang="scss" scoped>
@import "../App.scss";

.nav-icon {
  object-fit: contain;
  width: 42px;
  margin-top: -8px;
}

.nav-item {
  color: gray;
  padding: 8px;
  border-bottom: 2px solid transparent;
}

.nav-item:hover {
  text-decoration: none;
  color: orange;
}

.nav-item-active {
  color: $primary;
  border-bottom: 2px solid $primary;
  cursor: default;
}

.nav-item-active:hover {
  color: $primary;
  cursor: default;
}

@media (max-width: 767.98px) {
  .nav-item {
    border-bottom: none;
  }

  .nav-item-active {
    border-bottom: none;
  }
}
</style>

<template>
  <b-navbar toggleable="md" type="light" variant="light" class="shadow-sm">
    <!-- Icon -->
    <router-link to="/" class="navbar-brand">
      <img src="../assets/icon.svg" alt="Home" class="nav-icon" />
    </router-link>

    <!-- Hamburger icon for mobile -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!-- Menu -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="navbar-nav ml-auto text-center">
        <router-link
          class="nav-item"
          active-class="nav-item-active"
          to="/about"
        >
          About
        </router-link>
        <router-link
          class="nav-item"
          active-class="nav-item-active"
          to="/course"
        >
          Courses
        </router-link>
        <router-link
          class="nav-item"
          active-class="nav-item-active"
          to="/login"
        >
          Login
        </router-link>
        <router-link
          class="nav-item"
          active-class="nav-item-active"
          to="/register"
        >
          Register
        </router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "navbar",
});
</script>
