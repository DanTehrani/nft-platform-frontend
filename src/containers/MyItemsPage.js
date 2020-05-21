import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Card, CardContent, Typography, CardMedia, Grid } from '@material-ui/core';
import TokenCard from '../components/TokenCard.js';
import LoadingProgress from '../components/LoadingProgress.js';
import { loadMyItemsPage } from '../actions';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9,
    flexGrox: 1
  },
}

export class MyItemsPage extends Component {
  componentWillMount() {
    this.props.loadMyItemsPage();
  }

  render() {
    const {
      classes,
      myTokens,
      loading
    } = this.props;

    return (
      <div>
      {loading &&
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <LoadingProgress />
          </Grid>
        </Grid>}
        <Grid container spacing={40}>
          {!loading && myTokens.map((mytoken, i) => <Grid item key={i}><TokenCard {...mytoken} /></Grid>)}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    myTokens,
    loading
  } = state.myItems;

  return {
    myTokens,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMyItemsPage: bindActionCreators(loadMyItemsPage, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyItemsPage));
