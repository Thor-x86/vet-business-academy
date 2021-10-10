declare type AccountModel = import("../models/AccountModel").default;

const accounts: AccountModel[] = [
  {
    email: "admin@vba.com",
    password: "123456",
    firstName: "Athaariq",
    lastName: "Ardhiansyah",
    role: "admin"
  },
  {
    email: "mentor@example.com",
    password: "123456",
    firstName: "Ando",
    lastName: "Subakti",
    role: "mentor"
  },
  {
    email: "student@example.com",
    password: "123456",
    firstName: "Tsaqova",
    lastName: "Altervista",
    role: "student"
  }
];

function getLoggedIndex(): number {
  return Number.parseInt(window.sessionStorage.getItem("account") || "NaN");
}

function setLoggedIndex(index: number): void {
  window.sessionStorage.setItem("account", String(index));
}

export function getAccount(): AccountModel | null {
  const accountIndex = getLoggedIndex();
  if (isNaN(accountIndex)) return null;
  else return accounts[accountIndex];
}

export function login(email: string, password: string): boolean {
  for (let i = 0; i < accounts.length; i++) {
    const eachAccount = accounts[i];
    if (eachAccount.email === email && eachAccount.password === password) {
      setLoggedIndex(i);
      return true;
    }
  }
  return false;
}

export function logout(): void {
  setLoggedIndex(NaN);
}
