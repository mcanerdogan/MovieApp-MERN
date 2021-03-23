import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.username,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usersession", response.data.data);
      console.log(JSON.stringify(localStorage.getItem("usersession")));
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (user) => {
  let session = localStorage.getItem("usersession");
  console.log(JSON.stringify(localStorage.getItem("usersession")));
  return axios
    .post("http://localhost:5000/users/logout", session)
    .then((response) => {
      console.log(response);
      console.log("çıkış yapıldı");
    })
    .catch((err) => {
      console.log(err);
    });
};
