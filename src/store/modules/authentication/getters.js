export const isLoggedIn = state => {
  return !!state.token;
};

export const authStatus = state => {
  return state.status;
};

export const authUser = state => {
  return state.user;
};
