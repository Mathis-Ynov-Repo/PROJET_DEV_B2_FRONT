export const isLoggedIn = (state) => {
  return !!state.token;
};

export const authStatus = (state) => {
  return state.status;
};

export const authUser = (state) => {
  return state.user;
};

export const isRestaurateur = (state) => {
  return !!state.user.roles.includes("ROLE_RESTAURATEUR");
};
