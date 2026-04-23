export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("accessToken");
}