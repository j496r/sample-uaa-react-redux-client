import React from "react";
import { connect } from "react-redux";
import { loadDataStartActionCreator, loadDataSuccessActionCreator } from "../actions";
import { requestDataFromApi } from "../utils/api";
import ReactJson from "react-json-view";
import Spinner from "react-spinkit";

class MainPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadDataStartActionCreator());
    requestDataFromApi(this.props.conf.serverUrl + "/env").then(result => {
      this.props.dispatch(loadDataSuccessActionCreator(result));
    });
  }

  render() {
    if (this.props.data) {
      return (
        <div style={styles.root}>
          <div style={styles.title}>
            <h3>Welcome</h3>
            <p>This is the data returned from the resource server.</p>
            <ReactJson src={this.props.data} />
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    flex: "1 0 auto"
  },
  list: {
    listStyle: "none"
  },
  li: {
    display: "flex"
  }
};

function mapStateToProps(state) {
  return {
    // WTF happend here?? I can not find where we got all these nested data and conf
    // TODO: figure it out
    data: state.data.data.data,
    conf: state.conf.conf.data
  };
}

export default connect(mapStateToProps)(MainPage);
