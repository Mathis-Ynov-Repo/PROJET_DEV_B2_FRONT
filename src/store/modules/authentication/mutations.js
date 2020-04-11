export const AUTH_REQUEST = state => {
  state.status = "loading";
};

export const AUTH_SUCCESS = (state, { token, user }) => {
  state.status = "success";
  state.token = token;
  state.user = user;
};

export const AUTH_ERROR = state => {
  state.status = "error";
};

export const LOGOUT = state => {
  state.status = "";
  state.token = "";
};
