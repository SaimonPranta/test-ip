export function userHeader() {
  return { Authentication: `Bearer ${localStorage.getItem("u_t")}` };
}
export function adminHeader() {
  return { Authentication: `Bearer ${localStorage.getItem("a_t")}` };
}
