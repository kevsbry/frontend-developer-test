export const loginStatus = (
  state: { isLoggedIn: boolean; isError?: boolean; errorMessage?: string } = {
    isLoggedIn: false,
  },
  action: {
    type: "LOGIN_STATUS_SUCCESS" | "LOGIN_STATUS_ERROR";
    payload?: { errMessage: string };
  }
) => {
  switch (action.type) {
    case "LOGIN_STATUS_SUCCESS":
      state = { isLoggedIn: true };
      return state;
    case "LOGIN_STATUS_ERROR":
      state = {
        isLoggedIn: false,
        isError: true,
        errorMessage: action.payload?.errMessage,
      };
      return state;
    default:
      return state;
  }
};
