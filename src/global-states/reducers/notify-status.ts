export const notificationStatus = (
  state: { isSuccess: boolean | undefined } = {
    isSuccess: undefined,
  },
  action: {
    type: "NOTIFICATION_SUCCESS" | "NOTIFICATION_ERROR";
    payload: number | string;
  }
) => {
  switch (action.type) {
    case "NOTIFICATION_SUCCESS":
      state = { isSuccess: true };
      return state;
    case "NOTIFICATION_ERROR":
      state = { isSuccess: false };
      return state;
    default:
      return state;
  }
};
