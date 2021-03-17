const getUser = () => {
  return localStorage.getItem("user");
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export { getUser, setUser, getToken, setToken };
