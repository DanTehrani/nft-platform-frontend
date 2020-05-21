import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import { resetErrorMessage } from '../actions';
import BrowsePage from './BrowsePage.js';
import MyAccountPage from './MyAccountPage.js';
import MyItemsPage from './MyItemsPage.js';
import CreatePage from './CreatePage.js';
import ErrorPage from './ErrorPage.js';

export const styles = {
  root: {
    flexGrow: 1
  },
  marginBottom: {
    margin: '0px 0px 50px'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {

  }
};

export class App extends Component {
  constructor() {
    super();
    this.onBrowseClick = this.onBrowseClick.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onMyItemsClick = this.onMyItemsClick.bind(this);
    this.onMyAccountClick = this.onMyAccountClick.bind(this);
    this.onReloadPageClick = this.onReloadPageClick.bind(this);
  }

  onBrowseClick() {
    this.props.history.push('/');
  }

  onCreateClick() {
    this.props.history.push('/create');
  }

  onMyItemsClick() {
    this.props.history.push('/myItems');
  }

  onMyAccountClick() {
    this.props.history.push('/myAccount');
  }

  onReloadPageClick() {
    this.props.resetErrorMessage();
    this.props.history.push('/');
  }

  render() {
    const {
      classes,
      errorMessage,
    } = this.props;

    if (errorMessage) {
      return <ErrorPage onReloadPageClick={this.onReloadPageClick}/>
    }

    return (
        <div className={classes.root}>
          <AppBar position='static' className={classes.marginBottom}>
            <Toolbar style={{alignItems: ''}}>
              <Button onClick={this.onBrowseClick} className={classes.menuButton} style={{marginLeft: 'auto'}}>Browse</Button>
              <Button onClick={this.onCreateClick} className={classes.menuButton}>Create</Button>
              <Button onClick={this.onMyItemsClick} className={classes.menuButton}>MyItems</Button>
              <Button onClick={this.onMyAccountClick} className={classes.menuButton}>MyAccount</Button>
            </Toolbar>
          </AppBar>
          <Route path='/' exact component={BrowsePage} />
          <Route path='/create' exact component={CreatePage} />
          <Route path='/myItems' exact component={MyItemsPage} />
          <Route path='/myAccount' exact component={MyAccountPage} />
       </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    errorMessage,
  } = state;

  return {
    errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetErrorMessage: bindActionCreators(resetErrorMessage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(App)));
