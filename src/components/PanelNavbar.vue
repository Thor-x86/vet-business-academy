<style lang="scss" scoped>
@import "../App.scss";

.navbar-root {
  @extend .shadow;
  background-color: white;
  width: 100%;
}

.navbar-branding {
  visibility: collapse;
  display: none;
}

.navbar-hamburger {
  @extend .btn, .btn-light;
}

.navbar-icon {
  @extend .ml-2, .mr-4, .mb-1;
  width: 42px;
  height: 42px;
}

.navbar-search {
  @extend .form-control, .mr-sm-2;
  max-width: 50%;
}

.navbar-notification {
  @extend .ml-auto;
}

.navbar-profile {
  margin-left: 16px;
}

.navbar-profile-name {
  @extend .ml-2;
}

@media (max-width: 1200px) {
  .navbar-branding {
    visibility: visible;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .navbar-profile-name {
    visibility: collapse;
    display: none;
  }
}

@media (max-width: 767.98px) {
  .navbar-search {
    visibility: collapse;
    display: none;
  }

  .navbar-notification {
    visibility: collapse;
    display: none;
  }

  .navbar-profile {
    margin-left: auto;
  }
}
</style>

<template>
  <b-navbar type="light" variant="light" class="navbar-root">
    <b-navbar-nav class="w-100">
      <div class="navbar-branding">
        <img
          src="../assets/ic_hamburger.svg"
          class="navbar-hamburger"
          alt="Open navigation"
          @click="onMenuClick"
        />
        <img
          src="../assets/icon.svg"
          class="navbar-icon"
          alt="Vet Business Academy"
        />
      </div>
      <input
        class="navbar-search"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <b-nav-item-dropdown right class="navbar-notification">
        <template v-slot:button-content>
          <img
            class="navbar-notification"
            src="../assets/ic_notification.svg"
            alt="Notifications"
          />
        </template>
        <b-dropdown-item disabled>No Notification</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right class="navbar-profile">
        <template v-slot:button-content>
          <span>
            <img src="../assets/ic_account.svg" :alt="fullname" />
          </span>
          <span class="navbar-profile-name">{{ fullname }}</span>
        </template>
        <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import { getAccount, logout } from "../api/AccountAPI";

export default Vue.extend({
  name: "navbar",
  props: {
    onMenuClick: {
      type: Function,
      required: true
    }
  },
  computed: {
    fullname(): string {
      const account = getAccount();
      if (account) {
        return account.firstName + " " + account.lastName;
      } else {
        return "Guest";
      }
    }
  },
  methods: {
    handleLogout(event: Event): void {
      event.preventDefault();
      logout();
      this.$router.push("/");
    }
  }
});
</script>
