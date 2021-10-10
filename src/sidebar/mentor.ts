declare type ItemModel = import("../models/SidepanelItemModel").default;

const student: ItemModel[] = [
  {
    title: "Dashboard",
    route: "/mentor/dashboard",
    icon: require("../assets/ic_dashboard.svg")
  },
  {
    title: "Courses",
    icon: require("../assets/ic_course.svg"),
    contents: [
      {
        title: "Add Material",
        route: "/mentor/course/create"
      },
      {
        title: "Add Assignment",
        route: "/mentor/assignment/create"
      },
      {
        title: "Add Quiz",
        route: "/mentor/quiz/create"
      },
      {
        title: "Grade Assignment",
        route: "/mentor/assignment/grade"
      }
    ]
  },
  {
    title: "Forum",
    route: "/mentor/forum",
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
    route: "/mentor/questionnaire",
    icon: require("../assets/ic_questionnaire.svg")
  }
];

export default student;
