import { downloadUsers } from "./UsersAPI";

declare type UserModel = import("../models/UserModel").default;
declare type MentorModel = import("../models/MentorModel").default;

let mentors: MentorModel[] = [];

export async function init(baseURL: string): Promise<void> {
  const mentorsRaw: string = window.sessionStorage.getItem("mentors") || "";
  try {
    mentors = JSON.parse(mentorsRaw);
  } catch (_error) {
    const users = await downloadUsers(baseURL, "mentors");
    if (users != null) {
      mentors = generateMentors(users);
    }
    flush();
  }
}

function flush(): void {
  window.sessionStorage.setItem("mentors", JSON.stringify(mentors));
}

function generateMentors(users: UserModel[]): MentorModel[] {
  const results: MentorModel[] = [];
  for (let eachUser of users) {
    const rating = Math.round((Math.random() + 4) * 10) / 10;
    const courseAdded = 5 + Math.round(Math.random() * 45);
    const assignmentAdded = courseAdded - Math.round(Math.random() * 5);
    const quizAdded = courseAdded - Math.round(Math.random() * 5);
    const coursePlaytime = 15 + Math.round(Math.random() * 105);
    const posts = Math.round(Math.random() * 200);
    const coursePercent = 75 + Math.round(Math.random() * 25);
    const assignmentPercent = 50 + Math.round(Math.random() * 50);
    const quizPercent = 60 + Math.round(Math.random() * 40);
    const ratingPercent = (rating * 100) / 5;
    results.push({
      ...eachUser,
      rating,
      courseAdded,
      assignmentAdded,
      quizAdded,
      coursePlaytime,
      posts,
      performaPercent: {
        course: coursePercent,
        assignment: assignmentPercent,
        quiz: quizPercent,
        rating: ratingPercent
      }
    });
  }
  return results;
}

export function getMentors(page: number): MentorModel[] {
  const maxIndex = mentors.length - 1;
  const pageOffset = (page - 1) * 10;
  const start = Math.min(pageOffset, maxIndex);
  const end = Math.min(pageOffset + 10, maxIndex);
  return mentors.slice(start, end);
}

export function getByID(id: number): MentorModel | null {
  for (let eachMentor of mentors) {
    if (eachMentor.id === id) return eachMentor;
  }
  return null;
}
