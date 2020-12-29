import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

import "../css/create.css";
import * as updateUserAction from "../redux/actions/editUser";
import * as list from "../redux/actions/list";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      sex: this.props.currentUser.sex,
      age: this.props.currentUser.age,
      password: "",
      repeat: "",
      error_firstName: false,
      error_lastName: false,
      error_sex: false,
      error_age: false,
      error_password: false,
      error_repeat: false,
    };
  }

  handleChange = (value, type) => {
    switch (type) {
      case "firstName":
        this.setState({ firstName: value });
        break;
      case "lastName":
        this.setState({ lastName: value });
        break;
      case "sex":
        this.setState({ sex: value });
        break;
      case "age":
        this.setState({ age: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "repeat":
        this.setState({ repeat: value });
        break;
      default:
        break;
    }
    this.check(type, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, sex, age, password } = this.state;
    const newUser = {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      sex: `${sex}`,
      age: `${age}`,
      password: `${password}`,
    };
    this.props.updateUser(
      newUser,
      this.props.currentUser._id,
      this.props.history
    );
  };

  check = (type, value) => {
    switch (type) {
      case "firstName":
        if (value.length <= 0 || !isNaN(value)) {
          this.setState({ error_firstName: true });
        } else {
          this.setState({ error_firstName: false });
        }
        break;
      case "lastName":
        if (value.length <= 0 || !isNaN(value)) {
          this.setState({ error_lastName: true });
        } else {
          this.setState({ error_lastName: false });
        }
        break;
      case "sex":
        if (value === "male" || value === "female") {
          this.setState({ error_sex: false });
        } else {
          this.setState({ error_sex: true });
        }
        break;
      case "age":
        if (isNaN(value)) {
          this.setState({ error_age: true });
        } else {
          this.setState({ error_age: false });
        }
        break;
      case "password":
        if (value.length <= 0) {
          this.setState({ error_password: true });
        } else {
          this.setState({ error_password: false });
        }
        break;
      case "repeat":
        if (value.length > 0 && this.state.password === value) {
          this.setState({ error_repeat: false });
        } else {
          this.setState({ error_repeat: true });
        }
        break;
      default:
        break;
    }
  };

  buttonDisabled = () => {
    const {
      firstName,
      lastName,
      sex,
      age,
      password,
      repeat,
      error_firstName,
      error_repeat,
      error_lastName,
      error_password,
      error_age,
      error_sex,
    } = this.state;
    if (
      !error_age &&
      !error_firstName &&
      !error_lastName &&
      !error_password &&
      !error_repeat &&
      !error_sex &&
      password &&
      repeat &&
      sex &&
      age &&
      lastName &&
      firstName
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { firstName, lastName, sex, age } = this.state;
    console.log(firstName);
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <TextField
            error={this.state.error_firstName}
            className="item"
            id="standard-basic"
            label="First Name"
            value={firstName}
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "firstName")}
          />
          <TextField
            error={this.state.error_lastName}
            className="item"
            id="standard-basic"
            label="Last Name"
            value={lastName}
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "lastName")}
          />
          <TextField
            error={this.state.error_sex}
            className="item"
            id="standard-basic"
            label="Sex"
            value={sex}
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "sex")}
          />
          <TextField
            error={this.state.error_age}
            className="item"
            id="standard-basic"
            label="Age"
            value={age}
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "age")}
          />
          <TextField
            error={this.state.error_password}
            className="item"
            id="standard-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "password")}
          />
          <TextField
            error={this.state.error_repeat}
            className="item"
            id="standard-basic"
            label="Repeat"
            variant="outlined"
            onChange={(e) => this.handleChange(e.target.value, "repeat")}
          />
          <button
            type="submit"
            className="button"
            disabled={this.buttonDisabled()}
          >
            Update User
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.editUser.currentUser,
    userList: state.list.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user, id, history) => {
      dispatch(updateUserAction.updateUser(user, id, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
