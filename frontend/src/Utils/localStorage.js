const getUserId = () => {
  return localStorage.getItem("user");
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { getUserId, setUser, removeUser, getToken, setToken, removeToken };
