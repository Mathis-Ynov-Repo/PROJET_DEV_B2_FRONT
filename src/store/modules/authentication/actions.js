import axios from "axios";

// export const AUTH_REQUEST = ({ commit, dispatch }, user) => {
//   return new Promise((resolve, reject) => {
//     // The Promise used for router redirect in login
//     commit("AUTH_REQUEST");
//     axios({ url: "auth", data: user, method: "POST" })
//       .then(resp => {
//         const token = resp.data.token;
//         localStorage.setItem("user-token", token); // store the token in localstorage
//         axios.defaults.headers.common["Authorization"] = token;
//         commit("AUTH_SUCCESS", token);
//         // you have your token, now log in your user :)
//         dispatch("USER_REQUEST");
//         resolve(resp);
//       })
//       .catch(err => {
//         commit("AUTH_ERROR", err);
//         localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
//         reject(err);
//       });
//   });
// };

export const login = ({ commit, dispatch }, user) => {
  return new Promise((resolve, reject) => {
    commit("AUTH_REQUEST");
    axios({
      url: "http://localhost:3000/api/login_check",
      data: user,
      method: "POST"
    })
      .then(resp => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        commit("AUTH_SUCCESS", { token, user });
        resolve(resp);
      })
      .catch(err => {
        commit("AUTH_ERROR");
        dispatch(
          "notifications/addNotification",
          {
            type: "error",
            message: "Identifiants erronés."
          },
          { root: true }
        );
        localStorage.removeItem("token");
        reject(err);
      });
  });
};

export const register = ({ commit, dispatch }, user) => {
  return new Promise((resolve, reject) => {
    commit("AUTH_REQUEST");
    const password = user.password;
    axios({
      url: "http://localhost:3000/api/register",
      data: user,
      method: "POST"
    })
      .then(resp => {
        const username = resp.data.email;
        console.log(username, password);
        dispatch("login", {
          username,
          password
        });
        resolve(resp);
      })
      .catch(err => {
        commit("AUTH_ERROR", err);
        reject(err);
      });
  });
};

export const logout = ({ commit }) => {
  return new Promise(resolve => {
    commit("LOGOUT");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
};
