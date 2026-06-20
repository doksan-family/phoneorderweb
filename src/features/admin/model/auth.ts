const AUTH_KEY = "phone-order-admin-auth";

export const adminAccount = {
  email: "admin@phoneorder.local",
  password: "phoneorder2026"
};

export function isAdminAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(AUTH_KEY) === "true";
}

export function loginAdmin(email: string, password: string) {
  const isValid = email === adminAccount.email && password === adminAccount.password;

  if (isValid) {
    window.sessionStorage.setItem(AUTH_KEY, "true");
  }

  return isValid;
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(AUTH_KEY);
}
