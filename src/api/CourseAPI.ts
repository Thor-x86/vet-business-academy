import { randomPickSentence } from "./LoremIpsumAPI";
import { randomPickNames } from "./RandomNameAPI";
import { getMaterialsByCourseID, deleteByCourseID } from "./CourseMaterialAPI";

declare type CourseModel = import("../models/CourseModel").default;

export const categories = [
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

let courses: CourseModel[] = [];

export function init() {
  const rawCourses: string = window.sessionStorage.getItem("courses") || "";
  try {
    courses = JSON.parse(rawCourses);
  } catch (_error) {
    courses = generateCourses();
    flush();
  }
}

export function getCourses(): CourseModel[] {
  return courses;
}

export function getCourseByID(id: number): CourseModel | null {
  for (let eachCourse of courses) {
    if (eachCourse.id === id) return eachCourse;
  }
  return null;
}

export function create(newCourse: CourseModel): void {
  newCourse.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  courses.push(newCourse);
  flush();
}

export function update(changedCourse: CourseModel): void {
  let index = courses.length;
  for (let i = 0; i < courses.length; i++) {
    const eachCourse = courses[i];
    if (eachCourse.id === changedCourse.id) {
      index = i;
      break;
    }
  }
  courses[index] = changedCourse;
  flush();
}

export function deleteByID(id: number): boolean {
  for (let i = 0; i < courses.length; i++) {
    const eachCourse = courses[i];
    if (eachCourse.id === id) {
      deleteByCourseID(eachCourse.id); // Cascade delete to course materials
      courses.splice(i, 1);
      flush();
      return true;
    }
  }
  return false;
}

export function countMaterialByID(id: number): number {
  return getMaterialsByCourseID(id).length;
}

function flush(): void {
  window.sessionStorage.setItem("courses", JSON.stringify(courses));
}

function generateCourses(): CourseModel[] {
  let results: CourseModel[] = [];
  for (let i = 0; i < 10; i++) {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const mentorCount = Math.ceil(Math.random() * 10);
    const participantCount = 10 + Math.round(Math.random() * 90);
    results.push({
      id,
      name: "Course " + (i + 1),
      description: randomPickSentence(),
      category: randomPickCategory(),
      mentors: randomPickNames(mentorCount),
      participantCount
    });
  }
  return results;
}

function randomPickCategory(): string {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}
