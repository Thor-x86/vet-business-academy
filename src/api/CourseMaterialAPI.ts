import { categories, getCourses } from "./CourseAPI";
import { randomPickWord, randomPickWords } from "./LoremIpsumAPI";
import { randomPickSentence } from "./LoremIpsumAPI";
import { randomPickPictures } from "./RandomPictureAPI";

declare type CourseMaterialModel = import("../models/CourseMaterialModel").default;

let courseMaterials: CourseMaterialModel[] = [];

export function init(): void {
  const rawData: string =
    window.sessionStorage.getItem("courseMaterials") || "";
  try {
    courseMaterials = JSON.parse(rawData);
  } catch (_error) {
    courseMaterials = generateCourseMaterial();
    flush();
  }
}

export function getMaterialsByCourseID(
  courseID: number
): CourseMaterialModel[] {
  let results: CourseMaterialModel[] = [];
  for (let eachMaterial of courseMaterials) {
    if (eachMaterial.courseID === courseID) results.push(eachMaterial);
  }
  return results;
}

export function getMaterialByID(id: number): CourseMaterialModel | null {
  for (let eachMaterial of courseMaterials) {
    if (eachMaterial.id === id) {
      return eachMaterial;
    }
  }
  return null;
}

export function create(newMaterial: CourseMaterialModel): void {
  newMaterial.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  courseMaterials.push(newMaterial);
  flush();
}

export function update(changedMaterial: CourseMaterialModel): void {
  let index = courseMaterials.length;
  for (let i = 0; i < courseMaterials.length; i++) {
    const eachMaterial = courseMaterials[i];
    if (eachMaterial.id === changedMaterial.id) {
      index = i;
      break;
    }
  }
  courseMaterials[index] = changedMaterial;
  flush();
}

export function deleteByID(id: number): boolean {
  for (let i = 0; i < courseMaterials.length; i++) {
    const eachMaterial = courseMaterials[i];
    if (eachMaterial.id === id) {
      courseMaterials.splice(i, 1);
      flush();
      return true;
    }
  }
  return false;
}

export function deleteByCourseID(courseID: number): void {
  let newCourseMaterials: CourseMaterialModel[] = [];
  for (let i = 0; i < courseMaterials.length; i++) {
    const eachMaterial = courseMaterials[i];
    if (eachMaterial.courseID !== courseID) {
      newCourseMaterials.push(eachMaterial);
    }
  }
  courseMaterials = newCourseMaterials;
}

function flush(): void {
  window.sessionStorage.setItem(
    "courseMaterials",
    JSON.stringify(courseMaterials)
  );
}

function generateCourseMaterial(): CourseMaterialModel[] {
  const courses = getCourses();
  let results: CourseMaterialModel[] = [];
  for (let eachCourse of courses) {
    const randomCount = 5 + Math.round(Math.random() * 10);
    for (let i = 0; i < randomCount; i++) {
      const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      const description = randomPickSentence();
      let title = randomPickWord(description);
      title = title[0].toUpperCase() + title.substr(1).toLowerCase();
      const videoCount = 5 + Math.round(Math.random() * 10);
      const videos = randomPickPictures(videoCount);
      results.push({
        id,
        courseID: eachCourse.id,
        title,
        description,
        categories: randomPickCategories(),
        content: generateContent(),
        attachments: generateAttachments(),
        videos,
        pictures: randomPickPictures(4)
      });
    }
  }
  return results;
}

function randomPickCategories(): string[] {
  let randomCount = Math.floor(Math.random() * categories.length);
  if (categories.length > 0 && randomCount <= 0) {
    randomCount = 1;
  }
  let results: string[] = [];
  for (let i = 0; i < randomCount; i++) {
    let eachRandom: string;
    do {
      const randomIndex = Math.floor(Math.random() * categories.length);
      eachRandom = categories[randomIndex];
    } while (results.includes(eachRandom));
    results.push(eachRandom);
  }
  return results;
}

function generateContent(): string {
  let result: string = "";
  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      result += `<h3>${randomPickSentence()}</h3><br>`;
    } else {
      result += `<p>${randomPickSentence()}</p>`;
    }
  }
  return result;
}

function generateAttachments(): string[] {
  const randomCount = Math.round(Math.random() * 10);
  let results = randomPickWords(randomCount);
  for (let i = 0; i < randomCount; i++) {
    const flipCoin = Math.round(Math.random());
    if (flipCoin) {
      results[i] = results[i] + ".pdf";
    } else {
      results[i] = results[i] + ".pptx";
    }
  }
  return results;
}
