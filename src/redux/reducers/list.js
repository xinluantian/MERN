const INITIAL_STATE = {
  userList: [],
  pageNum: 0,
  totalPage: 0,
  recordsPerPage: 3,
  isFetching: false,
  error: "",
  query: "",
  sortBy: "no",
  orderBy: 0,
};

const list = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_FETCH_START":
      return {
        ...state,
        isFetching: true,
      };
    case "USER_FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: "",
        userList: action.payload,
        totalPage: action.totalPage,
        pageNum: action.pageNum,
        recordsPerPage: action.recordsPerPage,
      };
    case "USER_FETCH_FAIL":
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: true,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: "",
      };
    case "DELETE_USER_FAIL":
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case "SET_PAGE_NUM":
      return {
        ...state,
        pageNum: action.pageNum,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.query,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case "SET_DIRECTION":
      return {
        ...state,
        orderBy: action.orderBy,
      };
    case "RESET":
      return {
        ...state,
        userList: [],
        totalPage: 0,
      };
    default:
      return state;
  }
};

export default list;
