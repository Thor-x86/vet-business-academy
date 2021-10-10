declare type ItemModel = import("../models/SidepanelItemModel").default;

const student: ItemModel[] = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: require("../assets/ic_dashboard.svg")
  },
  {
    title: "Calendar",
    route: "/calendar",
    icon: require("../assets/ic_calendar.svg")
  },
  {
    title: "My Journal",
    route: "/journal",
    icon: require("../assets/ic_journal.svg")
  },
  {
    title: "Courses",
    icon: require("../assets/ic_course.svg"),
    contents: [
      {
        title: "Active Courses",
        route: "/course/active"
      },
      {
        title: "Assignments",
        route: "/course/assignment"
      },
      {
        title: "Quiz",
        route: "/course/quiz"
      },
      {
        title: "My Score",
        route: "/course/score"
      },
      {
        title: "Review and Ratings",
        route: "/course/review"
      }
    ]
  },
  {
    title: "Forum",
    route: "/forum",
    icon: require("../assets/ic_forum.svg")
  },
  {
    title: "Live Chat",
    icon: require("../assets/ic_chat.svg"),
    contents: [
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
    route: "/questionnaire",
    icon: require("../assets/ic_questionnaire.svg")
  }
];

export default student;
