import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Card, CardContent, Typography, CardMedia, Grid } from '@material-ui/core';
import TokenCard from '../components/TokenCard.js';
import LoadingProgress from '../components/LoadingProgress.js';
import { loadBrowsePage } from '../actions';

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

export class BrowsePage extends Component {
  componentWillMount() {
    this.props.loadBrowsePage();
  }

  render() {
    const {
      classes,
      tokens,
      loading
    } = this.props;

    return (
      <div>
        {loading &&
          <Grid container justify='center' alignItems='center' spacing={40}>
            <Grid item>
              <LoadingProgress />
            </Grid>
          </Grid>}
        <Grid container spacing={40}>
          {!loading && tokens.map((token, i) => <Grid item key={i}><TokenCard {...token} /></Grid>)}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    tokens,
    loading
  } = state.browse;

  return {
    tokens,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBrowsePage: bindActionCreators(loadBrowsePage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowsePage));
