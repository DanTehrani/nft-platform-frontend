import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMyAccountPage } from '../actions';
import ErrorMessage from '../components/ErrorMessage.js';

export class ErrorPage extends Component {
  render() {
    const {
      errorMessage,
      onReloadPageClick
    } = this.props;

    return (
      <ErrorMessage onReloadPageClick={onReloadPageClick} errorMessage={errorMessage}/>
    );
  }
}

const mapStateToProps = state => {
	const {
		errorMessage
	} = state;

	return {
		errorMessage
	}
}

export default connect(mapStateToProps)(ErrorPage);
