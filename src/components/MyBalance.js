import React, { Component } from 'react';
import { Text } from 'rimble-ui';

class MyBalance extends Component {
  render() {
    return (
      <Text> Balance {this.props.balance}</Text>
    )
  }
}

export default MyBalance;
