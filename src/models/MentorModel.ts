declare type UserModel = import("./UserModel").default;

export default interface MentorModel extends UserModel {
  rating: number;
  courseAdded: number;
  assignmentAdded: number;
  quizAdded: number;
  coursePlaytime: number;
  posts: number;
  performaPercent: {
    course: number;
    assignment: number;
    quiz: number;
    rating: number;
  };
}
