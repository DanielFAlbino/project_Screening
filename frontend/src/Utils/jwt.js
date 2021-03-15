export const getJwt = () => localStorage.getItem("token");

export const clearJwt = () => {
  try {
    return localStorage.removeItem("token");
  } catch {
    console.log("Error removing token");
  }
};
export const setJwt = (token) => {
  try {
    localStorage.setItem("token", token);
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
export const setUser = (user) => {
  try {
    localStorage.setItem("user", user);
  } catch {
    console.log("Error setting user");
  }
};
