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
        next("/admin/dashboard");
        break;
      case "mentor":
        next("/mentor/dashboard");
        break;
      case "student":
        next();
        break;
      default:
        logout();
        next("/login");
        break;
    }
  } else {
    next("/login");
  }
}
