import axios from "axios";

// get user info
const requestStart = () => ({ type: "USER_FETCH_START" });
const requestSuccess = (info) => ({
  type: "USER_FETCH_SUCCESS",
  payload: info.users,
  totalPage: info.totalPage,
  recordsPerPage: info.recordsPerPage,
  pageNum: info.pageNum,
  error: null,
});
const requestFail = (error) => ({ type: "USER_FETCH_FAIL", error: error.data });

// delete user
const deleteRequestStart = () => ({ type: "DELETE_USER_START" });
const deleteRequestSuccess = () => ({ type: "DELETE_USER_SUCCESS" });
const deleteRequestFail = (error) => ({
  type: "DELETE_USER_FAIL",
  error: error.data,
});

// set params
export const setPageNum = (pageNum) => ({ type: "SET_PAGE_NUM", pageNum });
export const setQuery = (query) => ({ type: "SET_QUERY", query });
export const setSortBy = (sortBy) => ({ type: "SET_SORT_BY", sortBy });
export const setDirection = (orderBy) => ({ type: "SET_DIRECTION", orderBy });

export const reset = () => {
  return {
    type: "RESET",
  };
};

export const deleteUser = (id, pageNum, query, sortBy, direction) => {
  return (dispatch) => {
    dispatch(deleteRequestStart());
    axios
      .delete(`/api/users/delete/${id}`)
      .then((res) => {
        dispatch(deleteRequestSuccess());
        dispatch(fetchData(pageNum, query, sortBy, direction));
      })
      .catch((err) => dispatch(deleteRequestFail(err.response)));
  };
};

const fetchData = (page, query = "", sortBy = "no", orderBy = 0) => {
  return (dispatch) => {
    if (!query) {
      dispatch(getUserList(page, sortBy, orderBy));
    } else {
      dispatch(getSearchList(query, page, sortBy, orderBy));
    }
  };
};

export const getUserList = (page = 0, sortBy, orderBy) => {
  return (dispatch) => {
    dispatch(requestStart());
    axios
      .get(`/api/users/get/${page}/${sortBy}/${orderBy}`)
      .then((res) => {
        dispatch(requestSuccess(res.data));
        // console.log(res.data);
      })
      .catch((err) => dispatch(requestFail(err.response)));
  };
};

export const getSearchList = (query, page, sortBy, orderBy) => {
  // /api/users/search/:search/:page/:sortBy/:orderBy
  return (dispatch) => {
    dispatch(requestStart());
    axios
      .get(`/api/users/search/${query}/${page}/${sortBy}/${orderBy}`)
      .then((res) => {
        dispatch(requestSuccess(res.data));
      })
      .catch((err) => dispatch(requestFail(err.response)));
  };
};
