import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WrongNetworkLabel from '../components/WrongNetworkLabel.js';
import MyAccount from '../components/MyAccount.js';
import MyBalance from '../components/MyBalance.js';
import LoadingProgress from '../components/LoadingProgress.js';
import { loadMyAccountPage } from '../actions';
import { Grid } from '@material-ui/core';

export class MyAccountPage extends Component {
  constructor() {
    super();
    this.renderWrongNetwork = this.renderWrongNetwork.bind(this);
    this.renderMyAccount = this.renderMyAccount.bind(this);
  }

  componentWillMount() {
    this.props.loadMyAccountPage();
  }

  renderWrongNetwork() {
    return (
      <WrongNetworkLabel />
    );
  }

  renderMyAccount() {
    const {
      address,
      balance,
    } = this.props;

    return (
      <div>
        <MyAccount address={address}/>
        <MyBalance balance={balance}/>
      </div>

    );
  }

  render() {
    const {
      metaMaskNetworkID,
      loading
    } = this.props;

    const isCorrectNetwork = metaMaskNetworkID === 3;

    return (
      <div>
        {loading
          &&
          <Grid container justify='center' alignItems='center'>
            <Grid item>
              <LoadingProgress />
            </Grid>
          </Grid>}
        {!loading && !isCorrectNetwork && this.renderWrongNetwork()}
        {!loading && isCorrectNetwork && this.renderMyAccount()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    address,
    balance,
    metaMaskNetworkID,
    loading
  } = state.userInfo;

  return {
    address,
    balance,
    metaMaskNetworkID,
    loading
	};
};

const mapDispatchToProps = dispatch => {
  return {
    loadMyAccountPage: bindActionCreators(loadMyAccountPage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);
