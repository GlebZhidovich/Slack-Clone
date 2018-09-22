import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "@/actions";
import AuthNavBar from "./AuthNavBar";
import UnauthNavBar from "./UnauthNavBar";
import { getIsUserLoggedIn, getCurrentUser } from "@/reducers";

class NavBar extends React.Component {
  handleLogout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, currentUser, history } = this.props;
    return (
      <div className="navbar-container">
        {isUserLoggedIn && (
          <AuthNavBar
            history={history}
            username={currentUser.username}
            handleLogout={this.handleLogout}
          />
        )}
        {!isUserLoggedIn && <UnauthNavBar history={history} />}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: getIsUserLoggedIn(state),
  currentUser: getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(authAction.logoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);