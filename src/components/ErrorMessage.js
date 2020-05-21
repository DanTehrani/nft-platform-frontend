import React, { Component } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';

class ErrorMessage extends Component {
  render() {
    const {
      errorMessage,
      onReloadPageClick
    } = this.props;
    console.error(errorMessage)

    return (
      <div>
        <Grid container alignItems='center' justify='center' direction='column' spacing={16}>
          <Grid item>
            <Typography variant='title'>Something went wrong</Typography>
          </Grid>
          <Grid item>
            <Button color='primary' variant='contained' onClick={onReloadPageClick}>Reload page</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default ErrorMessage;
