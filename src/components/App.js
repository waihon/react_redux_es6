// This component handles the App template used on every page.
import React, {PropTypes} from "react";
import Header from "./common/Header";
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // A simple logic to determine whether loading is in progress
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
