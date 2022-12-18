import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { push } from "react-router-redux";

class CallbackPage extends React.Component {
  render() {
    // just redirect to '/' in both cases
    return (
      // The callback component will here extract and store the 
      // id- and access-token in the user part of the oidc redux state.
      <CallbackComponent
        userManager={this.props.usermanager}
        successCallback={() => this.props.dispatch(push("/"))}
        errorCallback={error => {
          this.props.dispatch(push("/")); // Navigate to the root path (using push action creator from react-router-redux)
                                          // The "router reducer" provided by the react-router-redux lib will update the redux
                                          // store state to reflect the new location, and then render the react app to the new location.
          console.error(error);
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    conf: state.conf.conf,
    usermanager: state.conf.usermanager
  };
}

export default connect(mapStateToProps)(CallbackPage);
