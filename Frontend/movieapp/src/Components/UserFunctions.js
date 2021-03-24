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
      localStorage.setItem("usertoken", response.data);
      console.log(JSON.stringify(localStorage.getItem("usertoken")));
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
