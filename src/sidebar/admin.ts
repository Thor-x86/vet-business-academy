declare type ItemModel = import("../models/SidepanelItemModel").default;

const admin: ItemModel[] = [
  {
    title: "Dashboard",
    route: "/admin/dashboard",
    icon: require("../assets/ic_dashboard.svg")
  },
  {
    title: "Users",
    icon: require("../assets/ic_people.svg"),
    contents: [
      {
        title: "Student Information",
        route: "/admin/users/student"
      },
      {
        title: "Mentor Information",
        route: "/admin/users/mentor"
      },
      {
        title: "Group/Cohort",
        route: "/admin/users/group_cohort"
      }
    ]
  },
  {
    title: "Courses Management",
    icon: require("../assets/ic_course.svg"),
    contents: [
      {
        title: "Add Courses",
        route: "/admin/course/create"
      },
      {
        title: "All Courses",
        route: "/admin/course/all"
      },
      {
        title: "Review & Ratings",
        route: "/admin/course/review"
      }
    ]
  },
  {
    title: "Forum",
    icon: require("../assets/ic_forum.svg"),
    contents: [
      {
        title: "Create Forum",
        route: "/admin/forum/create"
      },
      {
        title: "All Forum",
        route: "/admin/forum"
      }
    ]
  },
  {
    title: "Announcement",
    route: "/admin/announcement",
    icon: require("../assets/ic_announcement.svg")
  },
  {
    title: "Live Chat",
    icon: require("../assets/ic_chat.svg"),
    contents: [
      {
        title: "Moderate Chat",
        route: "/chat/moderate"
      },
      {
        title: "General Chat",
        route: "/chat/general"
      },
      {
        title: "Group Chat",
        route: "/chat/group"
      }
    ]
  },
  {
    title: "Questionnaire",
    route: "/admin/questionnaire",
    icon: require("../assets/ic_questionnaire.svg")
  }
];

export default admin;
