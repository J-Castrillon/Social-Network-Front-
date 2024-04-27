export const SessionReducer = (state = {}, action) => {
  switch (action.type) {
    case "newSession":
      state = action.payload;
      return state;
    case "endSession":
      state = action.payload;
      return state;
    case "session":
      return state;
  }
};
