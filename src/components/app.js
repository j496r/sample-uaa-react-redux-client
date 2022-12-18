import React from "react";
import { Provider } from "react-redux";
import { OidcProvider } from "redux-oidc";
import Routes from "../routes";
import store from "../store";
import Root from "../components/root";
import { connect } from "react-redux";
import { loadConfStartActionCreator, loadConfSuccessActionCreator } from "../actions";
import { requestOAuthClientConfigFromBackend } from "../utils/api";
import Spinner from "react-spinkit";

class App extends React.Component {
  componentWillMount() {
    // Load credentials for OAuth2 client in cloud foundry when the react app initializes
    // The dispatch function from redux is available in the props thanks to the connect function further down.
    this.props.dispatch(loadConfStartActionCreator());
    requestOAuthClientConfigFromBackend().then(result => {
      // This call will create and store the userManager that will take care of our communication with the OIDC client
      this.props.dispatch(loadConfSuccessActionCreator(result));
    });
  }

  render() {
    if (this.props.conf.data) {
      return (
        // Wrap the app in a Provider component from the react-redux library
        // to connect the app to the Redux store  (makes the store available to all
        // components in the React component tree)
        <Provider store={store}>
          {/* Wrapp the app in OidcProvider from redux-oidc to handle user authentication */}
          <OidcProvider store={store} userManager={this.props.usermanager}>
            <Root>
              <Routes />
            </Root>
          </OidcProvider>
        </Provider>
      );
    } else {
      return <Spinner name="double-bounce" />;
    }
  }
}

// This is a recuring pice of code, it is used to pass redux states to props in the components.
// The magic is the connect function passing required parts of the redux state to props
// and a reference to the store in this case is added separately.
function mapStateToProps(state) {
  return {
    conf: state.conf.conf,
    usermanager: state.conf.usermanager
  };
}

function connectWithStore(store, WrappedComponent, ...args) {
  let ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

export default connectWithStore(store, App, mapStateToProps);
