const INITIAL_STATE = {
  isCreating: false,
  error: "",
  success: false,
  totalPage: 0,
};

const createUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_USER_START":
      return {
        isCreating: true,
      };
    case "CREATE_USER_SUCCESS":
      return {
        isCreating: false,
        error: "",
        success: true,
      };
    case "CREATE_USER_FAIL":
      return {
        isCreating: false,
        error: action.error,
        success: false,
      };
    default:
      return state;
  }
};

export default createUser;
