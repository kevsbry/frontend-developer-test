export const numberOfDevices = (
  state: { data: number | string; isLoading: boolean } = {
    data: 0,
    isLoading: true,
  },
  action: {
    type: "SET_NUMBER_OF_DEVICES" | "FETCHING";
    payload: number | string;
  }
) => {
  switch (action.type) {
    case "FETCHING":
      state = { data: 0, isLoading: true };
      return state;
    case "SET_NUMBER_OF_DEVICES":
      state = { data: action.payload, isLoading: false };
      return state;
    default:
      return state;
  }
};
