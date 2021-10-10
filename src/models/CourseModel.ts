export default interface CourseModel {
  id: number;
  name: string;
  category: string;
  description: string;
  mentors: string[];
  participantCount: number;
}
