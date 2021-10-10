import { randomPickSentence, randomPickWord } from "./LoremIpsumAPI";
import { randomPickNames } from "./RandomNameAPI";

declare type GroupModel = import("../models/GroupModel").default;

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

let groups: GroupModel[] = [];

export function init(): void {
  const rawGroups = window.sessionStorage.getItem("groups") || "";
  try {
    groups = JSON.parse(rawGroups);
  } catch (_error) {
    groups = generateGroups();
    flush();
  }
}

export function getGroups(page: number): GroupModel[] {
  const maxIndex = groups.length - 1;
  const pageOffset = (page - 1) * 10;
  const start = Math.min(pageOffset, maxIndex);
  const end = Math.min(pageOffset + 10, maxIndex);
  return groups.slice(start, end);
}

export function getByID(id: number): GroupModel | null {
  for (let eachGroup of groups) {
    if (eachGroup.id === id) return eachGroup;
  }
  return null;
}

export function create(newGroup: GroupModel): void {
  newGroup.id = Math.ceil(Math.random() * (Number.MAX_SAFE_INTEGER - 1));
  groups.push(newGroup);
  flush();
}

export function update(changedGroup: GroupModel): void {
  let index = groups.length;
  for (let i = 0; i < groups.length; i++) {
    const eachGroup = groups[i];
    if (eachGroup.id === changedGroup.id) {
      index = i;
      break;
    }
  }
  groups[index] = changedGroup;
  flush();
}

function flush() {
  window.sessionStorage.setItem("groups", JSON.stringify(groups));
}

function generateGroups(): GroupModel[] {
  let results: GroupModel[] = [];
  for (let i = 0; i < 500; i++) {
    const id = Math.ceil(Math.random() * (Number.MAX_SAFE_INTEGER - 1));
    const description = randomPickSentence();
    let name: string = randomPickWord(description);
    name = name[0].toUpperCase() + name.substr(1).toLowerCase();
    const category = randomPickCategory();
    const mentorCount = Math.ceil(Math.random() * 5);
    const mentors = randomPickNames(mentorCount);
    const participantCount = 5 + Math.round(Math.random() * 15);
    const participants = randomPickNames(participantCount);
    results.push({
      id,
      name,
      description,
      category,
      mentors,
      participants
    });
  }
  return results;
}

function randomPickCategory(): string {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}
