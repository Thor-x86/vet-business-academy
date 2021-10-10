import { downloadUsers } from "./UsersAPI";

declare type UserModel = import("../models/UserModel").default;
declare type StudentModel = import("../models/StudentModel").default;

let students: StudentModel[] = [];

const interests = [
  "Vet Clinic",
  "Business",
  "Marketing",
  "Financial",
  "Healthcare",
  "Human Resource Management",
  "Tech Departement",
  "Food Technology",
  "Surgery",
  "Cat Lover",
  "Dog Lover"
];

export async function init(baseURL: string): Promise<void> {
  const studentsRaw: string = window.sessionStorage.getItem("students") || "";
  try {
    students = JSON.parse(studentsRaw);
  } catch (_error) {
    const users = await downloadUsers(baseURL, "students");
    if (users != null) {
      students = generateStudents(users);
    }
    flush();
  }
}

function flush(): void {
  window.sessionStorage.setItem("students", JSON.stringify(students));
}

function randomPickInterest(): string {
  const index = Math.floor(Math.random() * interests.length);
  return interests[index];
}

function generateStudents(users: UserModel[]): StudentModel[] {
  let results: StudentModel[] = [];
  for (let eachUser of users) {
    const courseTaken = 20 + Math.round(Math.random() * 30);
    const courseCompleted =
      courseTaken - Math.round((Math.random() * courseTaken) / 10);
    const assignments = 30 + Math.round(Math.random() * 40);
    const submittedAssignments =
      assignments - Math.round((Math.random() * assignments) / 10);
    const overdueAssignments = Math.round(
      Math.random() * (assignments - submittedAssignments)
    );
    const halfCourses = courseTaken / 2;
    const quizes = halfCourses + Math.round(Math.random() * halfCourses);
    const completedQuizes = quizes - Math.round((Math.random() * quizes) / 10);
    const missedQuizes = Math.round(Math.random() * (quizes - completedQuizes));
    const maxScore = (submittedAssignments + completedQuizes) * 10;
    const totalScore = Math.round(Math.random() * maxScore);
    const courseHours = Math.round(courseTaken + Math.random() * 0.5);
    const posts = Math.round(Math.random() * 200);
    const coursePercent = (completedQuizes * 100) / quizes;
    const assignmentPercent = (submittedAssignments * 100) / assignments;
    const quizPercent = (completedQuizes * 100) / quizes;
    const scorePercent = (totalScore * 100) / maxScore;
    const overallPercent =
      (coursePercent + assignmentPercent + quizPercent + scorePercent) / 4;
    results.push({
      ...eachUser,
      courseTaken,
      courseCompleted,
      assignments,
      submittedAssignments,
      overdueAssignments,
      quizes,
      completedQuizes,
      missedQuizes,
      totalScore,
      courseHours,
      posts,
      performaPercent: {
        course: coursePercent,
        assignment: assignmentPercent,
        quiz: quizPercent,
        score: scorePercent,
        overall: overallPercent
      },
      interest: randomPickInterest()
    });
  }
  return results;
}

export function getStudents(page: number): StudentModel[] {
  const maxIndex = students.length - 1;
  const pageOffset = (page - 1) * 10;
  const start = Math.min(pageOffset, maxIndex);
  const end = Math.min(pageOffset + 10, maxIndex);
  return students.slice(start, end);
}

export function getByID(id: number): StudentModel | null {
  for (let eachStudent of students) {
    if (eachStudent.id === id) return eachStudent;
  }
  return null;
}
