import { init as initStudent } from "./api/StudentAPI";
import { init as initMentor } from "./api/MentorAPI";
import { init as initLoremIpsum } from "./api/LoremIpsumAPI";
import { init as initRandomName } from "./api/RandomNameAPI";
import { init as initRandomPicture } from "./api/RandomPictureAPI";
import { init as initCourse } from "./api/CourseAPI";
import { init as initGroup } from "./api/GroupAPI";
import { init as initCourseMaterial } from "./api/CourseMaterialAPI";
import { dispose as disposeLoremIpsum } from "./api/LoremIpsumAPI";
import { dispose as disposeRandomName } from "./api/RandomNameAPI";
import { dispose as disposeRandomPicture } from "./api/RandomPictureAPI";

export default async function initialize(baseURL: string): Promise<void> {
  await initStudent(baseURL);
  await initMentor(baseURL);
  await initLoremIpsum(baseURL);
  await initRandomName(baseURL);
  await initRandomPicture(baseURL);
  initCourse();
  initGroup();
  initCourseMaterial();
  disposeLoremIpsum();
  disposeRandomName();
  disposeRandomPicture();
}
