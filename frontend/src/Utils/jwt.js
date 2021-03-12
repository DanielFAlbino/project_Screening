export const getJwt = () => localStorage.getItem("hr-token");

export const clearJwt = () => {
  try {
    return localStorage.removeItem("hr-token");
  } catch {
    console.log("Error removing token");
  }
};
export const setJwt = (token) => {
  try {
    localStorage.setItem("hr-token", token);
  } catch {
    console.log("Error setting token");
  }
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    console.log("Error retrieving user");
  }
};
export const clearUser = () => {
  try {
    return localStorage.removeItem("user");
  } catch {
    console.log("Error clearing user");
  }
};
export const setUser = (token) => {
  try {
    localStorage.setItem("user", JSON.stringify(token));
  } catch {
    console.log("Error setting user");
  }
};
