// Helpers to work with localStorage
export function setUsers(user) {
  const currentUsers = getUsers();
  localStorage.setItem("users", JSON.stringify([...currentUsers, user]));
}

export function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}
