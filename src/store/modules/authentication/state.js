export default {
  token: localStorage.getItem("token") || "",
  status: "",
  user: JSON.parse(localStorage.getItem("user")) || {}
};
