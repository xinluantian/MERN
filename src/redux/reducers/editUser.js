const INITIAL_STATE = {
  currentUser: null,
  isUpdating: false,
  error: "",
  success: false,
};

const editUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "EDIT_USER_START":
      return {
        isUpdating: true,
      };
    case "EDIT_USER_SUCCESS":
      return {
        isUpdating: false,
        error: null,
        success: true,
      };
    case "EDIT_USER_FAIL":
      return {
        isUpdating: false,
        error: action.error,
        success: false,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

export default editUser;
