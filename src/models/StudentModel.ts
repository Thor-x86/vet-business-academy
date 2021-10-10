declare type UserModel = import("./UserModel").default;

export default interface StudentModel extends UserModel {
  interest: string;
  courseTaken: number;
  courseCompleted: number;
  assignments: number;
  submittedAssignments: number;
  overdueAssignments: number;
  quizes: number;
  completedQuizes: number;
  missedQuizes: number;
  totalScore: number;
  courseHours: number;
  posts: number;
  performaPercent: {
    course: number;
    assignment: number;
    quiz: number;
    score: number;
    overall: number;
  };
}
