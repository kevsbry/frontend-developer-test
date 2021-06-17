export const loadingState = (
  state = false,
  action: { type: "START_LOADING" | "STOP_LOADING" }
) => {
  switch (action.type) {
    case "START_LOADING":
      return true;
    case "STOP_LOADING":
      return false;
    default:
      return state;
  }
};
