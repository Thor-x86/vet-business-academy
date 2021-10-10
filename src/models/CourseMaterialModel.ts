export default interface CourseMaterialModel {
  id: number;
  courseID: number;
  title: string;
  description: string;
  categories: string[];
  videos: string[];
  pictures: string[];
  attachments: string[];
  content: string;
}
