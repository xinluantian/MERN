import { combineReducers } from "redux";
import list from "./list";
import createUser from "./createUser";
import editUser from "./editUser";

const reducers = combineReducers({
  list,
  createUser,
  editUser,
});

export default reducers;
