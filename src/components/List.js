import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Pagination from "@material-ui/lab/Pagination";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { Link } from "react-router-dom";

import * as userListAction from "../redux/actions/list";
import * as currentUserAction from "../redux/actions/editUser";

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData(
      this.props.pageNum,
      this.props.query,
      this.props.sortBy,
      this.props.orderBy
    );
    // console.log("Mount--------------");
  }

  // componentDidUpdate() {
  //   console.log("------------------");
  //   console.log(this.props);
  // }

  componentWillUnmount() {
    console.log("unmount success!");
    this.props.reset();
  }

  fetchData = (page, query = "", sortBy = "no", orderBy = 0) => {
    if (!query) {
      this.props.getUserList(page, sortBy, orderBy);
    } else {
      this.props.getSearchList(query, page, sortBy, orderBy);
    }
  };

  handleSort = (sortBy) => {
    this.props.setSortBy(sortBy);
    // console.log(this.props.orderBy);
    if (this.props.orderBy !== 1) {
      this.props.setDirection(1);
      this.fetchData(this.props.pageNum, this.props.query, sortBy, 1);
    } else {
      this.props.setDirection(-1);
      this.fetchData(this.props.pageNum, this.props.query, sortBy, -1);
    }
  };

  handleEdit = (user) => {
    this.props.setCurrentUser(user);
    this.props.history.push("/edit");
  };

  deleteUser = (id) => {
    if (this.props.userList.length === 1 && this.props.totalPage !== 1) {
      this.props.deleteUser(
        id,
        this.props.pageNum - 1,
        this.props.query,
        this.props.sortBy,
        this.props.orderBy
      );
    } else {
      this.props.deleteUser(
        id,
        this.props.pageNum,
        this.props.query,
        this.props.sortBy,
        this.props.orderBy
      );
    }
  };

  handleNextPage = () => {
    this.props.setPageNum(this.props.pageNum + 1);
    this.fetchData(
      this.props.pageNum + 1,
      this.props.query,
      this.props.sortBy,
      this.props.orderBy
    );
  };

  handlePrevPage = () => {
    this.props.setPageNum(this.props.pageNum - 1);
    this.fetchData(
      this.props.pageNum - 1,
      this.props.query,
      this.props.sortBy,
      this.props.orderBy
    );
  };

  handleChange = (value) => {
    this.props.setQuery(value);
    this.props.setPageNum(0);
    this.fetchData(0, value, this.props.sortBy, this.props.orderBy);
  };

  render() {
    if (this.props.error) {
      return <h1>Error!</h1>;
    }
    return (
      <div>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            value={this.props.query}
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell
                  align="center"
                  onClick={(e) => this.handleSort("firstName")}
                >
                  First Name
                  {this.props.sortBy === "firstName" &&
                    this.props.orderBy === 1 && <ArrowUpwardRoundedIcon />}
                  {this.props.sortBy === "firstName" &&
                    this.props.orderBy === -1 && <ArrowDownwardRoundedIcon />}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(e) => this.handleSort("lastName")}
                >
                  Last Name
                  {this.props.sortBy === "lastName" &&
                    this.props.orderBy === 1 && <ArrowUpwardRoundedIcon />}
                  {this.props.sortBy === "lastName" &&
                    this.props.orderBy === -1 && <ArrowDownwardRoundedIcon />}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(e) => this.handleSort("sex")}
                >
                  Sex
                  {this.props.sortBy === "sex" && this.props.orderBy === 1 && (
                    <ArrowUpwardRoundedIcon />
                  )}
                  {this.props.sortBy === "sex" && this.props.orderBy === -1 && (
                    <ArrowDownwardRoundedIcon />
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={(e) => this.handleSort("age")}
                >
                  Age
                  {this.props.sortBy === "age" && this.props.orderBy === 1 && (
                    <ArrowUpwardRoundedIcon />
                  )}
                  {this.props.sortBy === "age" && this.props.orderBy === -1 && (
                    <ArrowDownwardRoundedIcon />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.userList.map((user) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell style={{ width: 160 }} align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => this.handleEdit(user)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <Button
                        variant="contained"
                        color="disabled"
                        startIcon={<HighlightOffIcon />}
                        onClick={() => this.deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {user.firstName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {user.lastName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {user.sex}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {user.age}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <Button
                  variant="contained"
                  color="disabled"
                  disabled={this.props.pageNum === 0 ? true : false}
                  onClick={this.handlePrevPage}
                >
                  Prev
                </Button>
                <Button
                  variant="contained"
                  color="disabled"
                  onClick={this.handleNextPage}
                  disabled={
                    this.props.pageNum < this.props.totalPage - 1 ? false : true
                  }
                >
                  Next
                </Button>
                <Pagination
                  count={this.props.totalPage}
                  page={this.props.pageNum + 1}
                  hideNextButton={true}
                  hidePrevButton={true}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Link to="/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="green"
            style={{ paddingLeft: 13 }}
            startIcon={<PersonAddOutlinedIcon />}
          >
            Create new user
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.list.userList,
    totalPage: state.list.totalPage,
    pageNum: state.list.pageNum,
    query: state.list.query,
    sortBy: state.list.sortBy,
    orderBy: state.list.orderBy,
    error: state.list.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (pageNum, sortBy, orderBy) => {
      dispatch(userListAction.getUserList(pageNum, sortBy, orderBy));
    },
    getSearchList: (query, pageNum, sort) => {
      dispatch(userListAction.getSearchList(query, pageNum, sort));
    },
    deleteUser: (id, pageNum, query, sortBy, orderBy) => {
      dispatch(userListAction.deleteUser(id, pageNum, query, sortBy, orderBy));
    },
    setPageNum: (pageNum) => {
      dispatch(userListAction.setPageNum(pageNum));
    },
    setQuery: (query) => {
      dispatch(userListAction.setQuery(query));
    },
    setSortBy: (sortBy) => {
      dispatch(userListAction.setSortBy(sortBy));
    },
    setDirection: (orderBy) => {
      dispatch(userListAction.setDirection(orderBy));
    },
    setCurrentUser: (user) => {
      dispatch(currentUserAction.setCurrentUser(user));
    },
    reset: () => {
      dispatch(userListAction.reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
