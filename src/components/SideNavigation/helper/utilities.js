export const addClass = () => {
  const element = document.getElementById("profile-inner-search");
  if (!element) {
    return;
  }
  element.classList.add("focused");
};

export const removeClass = () => {
  const element = document.getElementById("profile-inner-search");
  if (!element) {
    return;
  }
  element.classList.remove("focused");
};
