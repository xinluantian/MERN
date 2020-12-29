import axios from "axios";

const requestStart = () => {
  return {
    type: "CREATE_USER_START",
  };
};

const requestSuccess = () => {
  return {
    type: "CREATE_USER_SUCCESS",
  };
};

const requestFail = (error) => {
  return {
    type: "CREATE_USER_FAIL",
    error: error.data,
  };
};

export const createNewUser = (user, history) => {
  return (dispatch) => {
    dispatch(requestStart());
    axios
      .post("/api/users/add", user)
      .then(() => {
        dispatch(requestSuccess());
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        dispatch(requestFail(err));
      });
  };
};
