import axios from "axios";

const requestStart = () => {
  return {
    type: "EDIT_USER_START",
  };
};

const requestSuccess = () => {
  return {
    type: "EDIT_USER_SUCCESS",
  };
};

const back = (user) => {
  return {
    type: "BACK",
    payload: user,
  };
};

const requestFail = (error) => {
  return {
    type: "EDIT_USER_FAIL",
    error: error.data,
  };
};

export const updateUser = (user, id, history) => {
  return (dispatch) => {
    dispatch(requestStart());
    axios
      .put(`/api/users/edit/${id}`, user)
      .then((res) => {
        dispatch(requestSuccess());
        history.push("/");
        // dispatch(back(user));
      })
      .catch((err) => {
        dispatch(requestFail(err));
      });
  };
};

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    currentUser: user,
  };
};
