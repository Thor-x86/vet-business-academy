import { RouteConfig } from "vue-router";

// import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import StudentDashboard from "./pages/student/Dashboard.vue";
import MentorDashboard from "./pages/mentor/Dashboard.vue";
import AdminLogin from "./pages/admin/Login.vue";
import AdminDashboard from "./pages/admin/Dashboard.vue";
import AdminUsers from "./pages/admin/Users.vue";
import AdminShowUser from "./pages/admin/ShowUser.vue";
import AdminShowUserGroup from "./pages/admin/ShowUserGroup.vue";
import AdminEditUserGroup from "./pages/admin/EditUserGroup.vue";
import AdminCourses from "./pages/admin/Courses.vue";
import AdminShowCourse from "./pages/admin/ShowCourse.vue";
import AdminEditCourse from "./pages/admin/EditCourse.vue";
import AdminShowCourseMaterial from "./pages/admin/ShowCourseMaterial.vue";
import AdminEditCourseMaterial from "./pages/admin/EditCourseMaterial.vue";
import NotFound from "./pages/NotFound.vue";

const routes: RouteConfig[] = [
  // { path: "/", component: Home },
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: StudentDashboard },
  { path: "/mentor/dashboard", component: MentorDashboard },
  { path: "/admin", redirect: "/admin/dashboard" },
  { path: "/admin/login", component: AdminLogin },
  { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/users", redirect: "/admin/users/student" },
  { path: "/admin/users/group_cohort/create", component: AdminEditUserGroup },
  { path: "/admin/users/group_cohort/:id", component: AdminShowUserGroup },
  { path: "/admin/users/group_cohort/:id/edit", component: AdminEditUserGroup },
  { path: "/admin/users/:category", component: AdminUsers },
  { path: "/admin/users/:category/:id", component: AdminShowUser },
  { path: "/admin/course", redirect: "/admin/course/all" },
  { path: "/admin/course/all", component: AdminCourses },
  { path: "/admin/course/create", component: AdminEditCourse },
  { path: "/admin/course/:id", component: AdminShowCourse },
  { path: "/admin/course/:id/edit", component: AdminEditCourse },
  {
    path: "/admin/course/:course_id/material/create",
    component: AdminEditCourseMaterial
  },
  {
    path: "/admin/course/:course_id/material/:material_id",
    component: AdminShowCourseMaterial
  },
  {
    path: "/admin/course/:course_id/material/:material_id/edit",
    component: AdminEditCourseMaterial
  },
  { path: "*", component: NotFound }
];

export default routes;
