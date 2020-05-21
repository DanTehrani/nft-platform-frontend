import React, { Component } from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = {
  progress: {
  }
}

class LoadingProgress extends Component {
  render() {
    const {
      classes
    } = this.props;

    return (
      <CircularProgress className={classes.progress} color="secondary" />
    )
  }
}

export default withStyles(styles)(LoadingProgress);
