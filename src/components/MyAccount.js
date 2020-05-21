import React, { Component } from 'react';
import { Text } from 'rimble-ui';

class MyAccount extends Component {
  render() {
    return (
      <Text>Account {this.props.address}</Text>
    )
  }
}

export default MyAccount;
