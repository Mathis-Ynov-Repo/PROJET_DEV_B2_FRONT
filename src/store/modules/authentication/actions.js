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

export const login = async ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit("AUTH_REQUEST");
    axios({
      url: "http://localhost:3000/api/login_check",
      data: user,
      method: "POST",
    })
      .then((resp) => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        commit("AUTH_SUCCESS", { token, user });
        resolve(resp);
      })
      .catch((err) => {
        commit("AUTH_ERROR");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        reject(err);
      });
  });
};

export const register = ({ commit, dispatch }, user) => {
  return new Promise((resolve, reject) => {
    commit("AUTH_REQUEST");
    const password = user.password;
    axios({
      url: "http://localhost:3000/api/users",
      data: user,
      method: "POST",
    })
      .then(async (resp) => {
        const username = resp.data.email;
        await dispatch("login", {
          username,
          password,
        });
        resolve(resp);
      })
      .catch((err) => {
        commit("AUTH_ERROR", err);
        reject(err);
      });
  });
};

export const logout = ({ commit }) => {
  return new Promise((resolve) => {
    commit("LOGOUT");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
};

export const updateUser = ({ commit, dispatch }, user) => {
  commit("UPDATE_USER", user);
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: "Profile updated successfully",
    },
    { root: true }
  );
};

export const updateUserAdmin = ({ dispatch }, user) => {
  dispatch(
    "notifications/addNotification",
    {
      type: "success",
      message: user.name + "'s profile has been updated successfully",
    },
    { root: true }
  );
};
