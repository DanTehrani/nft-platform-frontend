import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MyAccountPage } from './MyAccountPage.js';
import MyAccount from '../components/MyAccount.js';
import MyBalance from '../components/MyBalance.js';
import WrongNetworkLabel from '../components/WrongNetworkLabel.js';

Enzyme.configure({ adapter: new Adapter() });

const createTestProps = () => {
  return {
    loadMyAccountPage: () => {},
    address: '0xB16100f7187183568d7f05269fA7708c6AE34a65',
    balance: 100,
    metaMaskNetworkID: 3,
    loading: false
  }
};

describe('MyAccountPage', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });

  describe('when the netowork of the MetaMask is correct', () => {
    let myAccountPagWrapper;
    beforeEach(() => {
      myAccountPagWrapper = shallow(<MyAccountPage {...props}/>)
    });

    it('should render my page', () => {
      expect(myAccountPagWrapper.find(MyAccount)).toHaveLength(1);
    });

    it('should render account address', () => {
      expect(myAccountPagWrapper.find(MyAccount).prop('account')).toBe(props.account);
    });

    it('should render account balance', () => {
      expect(myAccountPagWrapper.find(MyBalance).prop('balance')).toBe(props.balance);
    });
  });

  describe('when the network of Metamask is incorrect', () => {
    let myAccountPagWrapper;
    beforeEach(() => {
      myAccountPagWrapper = shallow(<MyAccountPage {...props} metaMaskNetworkID={0}/>)
    });

    it('should render wrong network page', () => {
      expect(myAccountPagWrapper.find(WrongNetworkLabel)).toHaveLength(1);
    });
  });
});
