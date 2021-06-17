export const authenticationStatus = (
  state: "logged-in" | "logged-out" = "logged-out",
  action: {
    type: "LOGIN_USER" | "LOGOUT_USER" | "CHECK_LOGIN_STATUS";
    payload?: { jwt: string };
  }
) => {
  switch (action.type) {
    case "LOGIN_USER":
      if (action.payload?.jwt) {
        localStorage.setItem("jwt", action.payload?.jwt);
      }
      state = "logged-in";

      return state;
    case "LOGOUT_USER":
      localStorage.clear();
      state = "logged-out";

      return state;
    case "CHECK_LOGIN_STATUS":
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        state = "logged-in";
      } else {
        state = "logged-out";
      }

      return state;
    default:
      return state;
  }
};
