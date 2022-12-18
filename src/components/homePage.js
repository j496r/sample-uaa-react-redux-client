import React from "react";
import { connect } from "react-redux";
import LoginPage from "./loginPage";
import MainPage from "./mainPage";

function HomePage(props) {
  const { user } = props;

  // Show Mainpage if valid user authorization is present, else loginpage
  return !user || user.expired ? <LoginPage /> : <MainPage />;
}

// Map the user information stored in the redux state to props
// Contains information about the user from the OIDC provider after successful authorization
function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
