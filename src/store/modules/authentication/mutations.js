export const AUTH_REQUEST = (state) => {
  state.status = "loading";
};

export const AUTH_SUCCESS = (state, { token, user }) => {
  state.status = "success";
  state.token = token;
  state.user = user;
};

export const AUTH_ERROR = (state) => {
  state.status = "error";
};

export const LOGOUT = (state) => {
  state.status = "";
  state.token = "";
  state.user = {};
};

export const UPDATE_USER = (state, user) => {
  state.user = user;
};

export const LOWER_BALANCE = (state, price) => {
  state.user.balance = state.user.balance - (price + 2.5);
};
