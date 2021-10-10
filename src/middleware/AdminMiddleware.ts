import { getAccount, logout } from "../api/AccountAPI";

declare type Route = import("vue-router").Route;

export default function GuestMiddleware(
  to: Route,
  from: Route,
  next: (path?: string) => void
) {
  const account = getAccount();
  if (account) {
    switch (account.role) {
      case "admin":
        next();
        break;
      case "mentor":
        next("/mentor/dashboard");
        break;
      case "student":
        next("/dashboard");
        break;
      default:
        logout();
        next("/admin/login");
        break;
    }
  } else {
    next("/admin/login");
  }
}
