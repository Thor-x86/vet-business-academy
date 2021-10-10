export default interface AccountModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "student" | "mentor" | "admin";
}
